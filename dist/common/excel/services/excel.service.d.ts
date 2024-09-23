import { AnyDict, StringDict } from '@app/types/app.type';
import { AzureStorageService } from '@common/azure-storage/services/azure-storage.service';
import { ExcelGetDataOptions } from '@common/excel/types/excel.type';
import { MessageService } from '@common/message/services/message.service';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import { Workbook, Worksheet } from 'exceljs';
import { Response } from 'express';
import { I18nService } from 'nestjs-i18n';
export declare class ExcelService {
    private readonly azureStorageService;
    excelMessage: MessageService;
    private validateMessage;
    constructor(azureStorageService: AzureStorageService, i18nService: I18nService);
    getWorkSheet(key: string, validHeaders: StringDict): Promise<Worksheet>;
    validateExcelHeader(header: string[], validHeader: string[]): void;
    getExcelHeaders(worksheet: Worksheet): string[];
    extractExcelData<T>(cls: ClassConstructor<any>, worksheet: Worksheet, headers: string[], validateOptions?: ExcelGetDataOptions): Promise<[T[], (T & {
        errors: string;
    })[], AnyDict]>;
    exportDataToExcel<T>(dataSource: (page: number, limit: number) => Promise<[T[], number]>, header: StringDict, workSheetName: string, styles?: StringDict): Promise<Workbook>;
    writeDataToExcel<T>(data: T[], header: StringDict, workSheetName: string, styles?: StringDict, workbook?: Workbook, count?: number): Workbook;
    uploadWorkBookToS3(workbook: Workbook, name?: string): Promise<string>;
    streamWorkBookToResponse(workbook: Workbook, res: Response): void;
    private _extractWorkSheetData;
    private _validateWorkSheetData;
    private _rowValidator;
    private _getAsyncValidValue;
    private _handleAsyncValidValueDataSource;
}
