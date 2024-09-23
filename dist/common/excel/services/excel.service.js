"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelService = void 0;
const azure_storage_service_1 = require("../../azure-storage/services/azure-storage.service");
const custom_error_exception_1 = __importDefault(require("../../error/exceptions/custom-error.exception"));
const message_service_1 = require("../../message/services/message.service");
const date_util_1 = require("../../utils/date.util");
const string_util_1 = require("../../utils/string.util");
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const exceljs_1 = __importDefault(require("exceljs"));
const nestjs_i18n_1 = require("nestjs-i18n");
let ExcelService = class ExcelService {
    azureStorageService;
    excelMessage;
    validateMessage;
    constructor(azureStorageService, i18nService) {
        this.azureStorageService = azureStorageService;
        this.excelMessage = new message_service_1.MessageService(i18nService, 'excel');
        this.validateMessage = new message_service_1.MessageService(i18nService, 'validate');
    }
    async getWorkSheet(key, validHeaders) {
        const stream = await this.azureStorageService.getFile(key);
        const workbook = new exceljs_1.default.Workbook();
        await workbook.xlsx.load(stream.buffer);
        const worksheet = workbook.getWorksheet(1);
        if (!worksheet) {
            throw new custom_error_exception_1.default(400, 'EXCEL_BAD_REQUEST', this.excelMessage.get('WORKSHEET_NOT_FOUND'));
        }
        const headers = this.getExcelHeaders(worksheet);
        this.validateExcelHeader(headers, Object.values(validHeaders));
        return worksheet;
    }
    validateExcelHeader(header, validHeader) {
        if (JSON.stringify(header.map((v) => v.toString().toLowerCase().trim())) !==
            JSON.stringify(validHeader.map((v) => v.toLowerCase().trim()))) {
            throw new custom_error_exception_1.default(400, 'IMPORT_HEADER_ERROR', this.validateMessage.get('VALIDATE.IMPORT_HEADER_ERROR'));
        }
    }
    getExcelHeaders(worksheet) {
        const firstRow = worksheet.getRow(1);
        const headers = [];
        firstRow.eachCell((cell) => {
            headers.push(cell.value.toString());
        });
        return headers;
    }
    async extractExcelData(cls, worksheet, headers, validateOptions) {
        const validConstraintHeader = validateOptions && Object.keys(validateOptions?.asyncValidValues);
        const { rawData, rawConstraint } = this._extractWorkSheetData(worksheet, headers, cls, validConstraintHeader);
        const { validConstraint, validDict } = await this._getAsyncValidValue(rawConstraint, validateOptions?.asyncValidValues);
        const { data, errorData } = await this._validateWorkSheetData(rawData, {
            validConstraint,
            uniqueHeader: validateOptions?.uniqueHeader,
        });
        return [data, errorData, validDict];
    }
    async exportDataToExcel(dataSource, header, workSheetName, styles) {
        let count = 0;
        let page = 1;
        const limit = 500;
        let workbook = null;
        while (count > -1) {
            const [data] = await dataSource(page, limit);
            workbook = this.writeDataToExcel(data, header, workSheetName, styles, workbook, count);
            count = count + data.length;
            if (!data.length || data.length < limit) {
                count = -1;
            }
            else {
                page = page + 1;
            }
        }
        return workbook;
    }
    writeDataToExcel(data, header, workSheetName, styles, workbook, count) {
        let worksheet;
        if (!workbook) {
            workbook = new exceljs_1.default.Workbook();
            worksheet = workbook.addWorksheet(workSheetName);
            const columns = !data?.[0]?.['errors']
                ? [{ header: 'STT', key: 'no', width: 50 }]
                : [];
            Object.entries(header).forEach(([key, value]) => {
                columns.push({ header: value, key: key, width: 50 });
            });
            worksheet.columns = [...columns];
        }
        else {
            worksheet = workbook.getWorksheet(workSheetName);
        }
        data.forEach((d, i) => {
            if (styles) {
                Object.entries(styles).forEach(([key, value]) => {
                    switch (value) {
                        case 'date':
                            d[key] = (0, date_util_1.formatDateVN)(d[key]);
                            break;
                        case 'uppercase':
                            d[key] = d[key]?.toString()?.toUpperCase();
                            break;
                        case 'lowercase':
                            d[key] = d[key]?.toString()?.toLowerCase();
                            break;
                    }
                });
            }
            worksheet.addRow({
                ...d,
                no: (count || 0) + i + 1,
            });
        });
        return workbook;
    }
    async uploadWorkBookToS3(workbook, name) {
        const buffer = await workbook.xlsx.writeBuffer();
        const file = new Blob([buffer]);
        return this.azureStorageService.uploadFile(file, `${Date.now()}_export_${name ?? workbook.getWorksheet(1).name}.xlsx`);
    }
    streamWorkBookToResponse(workbook, res) {
        res.setHeader('Content-Type', 'application/vnd.ms-excel');
        res.setHeader('Content-Disposition', `attachment; filename=${Date.now()}.xlsx`);
        workbook.xlsx.write(res).then(() => {
            res.end();
        });
    }
    _extractWorkSheetData(worksheet, headers, cls, validConstraintHeader) {
        const rawData = [];
        const rawConstraint = {};
        for (let i = 2; i <= worksheet.rowCount; i++) {
            const row = worksheet.getRow(i);
            const rowData = {};
            row.eachCell((cell, colNumber) => {
                if ((cell.value !== null && cell.value !== undefined) ||
                    (cell.value['text'] !== null && cell.value['text'] !== undefined)) {
                    const header = headers[colNumber - 1];
                    if (typeof cell.value === 'object') {
                        rowData[header] = cell.value['text'];
                    }
                    else {
                        rowData[header] = cell.value;
                    }
                    if (validConstraintHeader?.includes(header)) {
                        if (rawConstraint[header]) {
                            rawConstraint[header] = [
                                ...rawConstraint[header],
                                rowData[header],
                            ];
                        }
                        else {
                            rawConstraint[header] = [rowData[header]];
                        }
                    }
                }
            });
            if (Object.values(rowData).length) {
                const excelRowDto = (0, class_transformer_1.plainToClass)(cls, rowData);
                rawData.push(excelRowDto);
            }
        }
        return { rawData, rawConstraint };
    }
    async _validateWorkSheetData(rawData, validateOptions) {
        const data = [];
        const errorData = [];
        for (const row of rawData) {
            const errors = await this._rowValidator(row, validateOptions);
            if (errors.length > 0) {
                row['errors'] = errors
                    .map((error) => (0, string_util_1.capitalizeText)(this.validateMessage.get('VALIDATE.' + Object.keys(error.constraints)[0].toUpperCase(), 'validate', {
                    field: this.validateMessage.get('FIELD.' + error.property?.toUpperCase()),
                })))
                    .join(', ');
                errorData.push(row);
            }
            else {
                data.push(row);
                if (validateOptions?.uniqueHeader) {
                    Object.keys(validateOptions.uniqueHeader)?.forEach((key) => {
                        if (validateOptions.uniqueHeader[key]) {
                            validateOptions.uniqueHeader[key].push(row[key]);
                        }
                        else {
                            validateOptions.uniqueHeader[key] = [row[key]];
                        }
                    });
                }
            }
        }
        return { data, errorData };
    }
    async _rowValidator(data, options) {
        const errors = await (0, class_validator_1.validate)(data);
        const { uniqueHeader, validConstraint } = options;
        if (uniqueHeader) {
            Object.entries(uniqueHeader)?.forEach(([key, value]) => {
                if (data[key] && value?.includes(data[key])) {
                    errors.push({
                        property: key,
                        constraints: {
                            isUnique: key,
                        },
                    });
                }
            });
        }
        if (validConstraint) {
            Object.entries(validConstraint)?.forEach(([key, value]) => {
                if (data[key]) {
                    if (Array.isArray(value)) {
                        if (!value?.includes(data[key]?.toString())) {
                            errors.push({
                                property: key,
                                constraints: {
                                    isInvalid: key,
                                },
                            });
                        }
                    }
                    else {
                        if (!value.customValidate(data, value.dataSource)) {
                            errors.push({
                                property: key,
                                constraints: {
                                    [value.errorConstraints ?? 'isInvalid']: key,
                                },
                            });
                        }
                    }
                }
            });
        }
        return errors;
    }
    async _getAsyncValidValue(rawConstraint, asyncValidValues) {
        const validConstraint = {};
        const validDict = {};
        if (Object.keys(rawConstraint).length !== 0) {
            const promiseDataSource = [];
            for (const [k, v] of Object.entries(asyncValidValues)) {
                promiseDataSource.push(this._handleAsyncValidValueDataSource([...new Set(rawConstraint[k]).values()], v));
            }
            const validDataSource = await Promise.all(promiseDataSource);
            Object.keys(asyncValidValues).forEach((k, i) => {
                validConstraint[k] = validDataSource[i].data;
                validDict[k] = validDataSource[i].dict;
            });
        }
        return { validConstraint, validDict };
    }
    async _handleAsyncValidValueDataSource(rawValues, option) {
        const { prop, dataSource, customValidate, errorConstraints } = option;
        const dto = await dataSource(rawValues);
        let validData;
        if (customValidate) {
            validData = {
                dataSource: dto,
                customValidate,
                errorConstraints,
            };
        }
        else {
            validData = dto.map((v) => v[prop]);
        }
        const validDict = dto.reduce((pre, cur) => {
            pre[cur[prop]] = cur;
            return pre;
        }, {});
        return { data: validData, dict: validDict };
    }
};
exports.ExcelService = ExcelService;
exports.ExcelService = ExcelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [azure_storage_service_1.AzureStorageService,
        nestjs_i18n_1.I18nService])
], ExcelService);
//# sourceMappingURL=excel.service.js.map