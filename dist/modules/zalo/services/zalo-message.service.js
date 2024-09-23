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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZaloMessageService = void 0;
const excel_service_1 = require("../../../common/excel/services/excel.service");
const date_util_1 = require("../../../common/utils/date.util");
const object_util_1 = require("../../../common/utils/object.util");
const string_util_1 = require("../../../common/utils/string.util");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const zalo_message_repository_1 = require("../repository/repositories/zalo-message.repository");
let ZaloMessageService = class ZaloMessageService {
    excelService;
    zaloMessageRepository;
    constructor(excelService, zaloMessageRepository) {
        this.excelService = excelService;
        this.zaloMessageRepository = zaloMessageRepository;
    }
    async getListOAMessage(params) {
        const [data, count] = await this.zaloMessageRepository.getZaloOAMessages(params);
        return (0, object_util_1.wrapPagination)(data, count, params);
    }
    async getObserverList() {
        return await this.zaloMessageRepository.getObserverList();
    }
    async observeMessage(user, body) {
        await this.zaloMessageRepository.update({ id: (0, typeorm_1.In)(body.message_ids) }, { observe_by: user.id, comment: body.comment });
    }
    async export(params) {
        const header = {
            sent_time: 'Sent time',
            from_id: 'Zalo ID',
            from_display_name: 'Zalo Name',
            activities: 'Activities',
            to_display_name: 'Reply Zalo',
            message_type: 'Messages type',
            message: 'Message',
            initial: 'Initial',
            observer_name: 'Observer',
        };
        const workbook = await this.excelService.exportDataToExcel(async (page, limit) => {
            params.page = page;
            params.limit = limit;
            const [data] = await this.zaloMessageRepository.getZaloOAMessages(params, true);
            return [
                data?.map((d) => {
                    const sentDate = new Date(d.timestamp);
                    return {
                        sent_time: (0, date_util_1.formatDateVN)(sentDate),
                        from_id: d.from_id,
                        from_display_name: d.from_display_name,
                        activities: d.from_id ? 'Sent' : 'Response',
                        to_display_name: !d.from_id ? d.to_display_name : '',
                        message_type: (0, string_util_1.upperCaseFirstLetter)(d.event_name.split('_').pop()),
                        message: d.message,
                        initial: d.observer?.profile?.upi || '',
                        observer_name: d.observer?.profile?.full_name || '',
                    };
                }),
                0,
            ];
        }, header, 'ZaloMessages');
        return {
            key: await this.excelService.uploadWorkBookToS3(workbook, 'ZaloMessages'),
        };
    }
};
exports.ZaloMessageService = ZaloMessageService;
exports.ZaloMessageService = ZaloMessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [excel_service_1.ExcelService,
        zalo_message_repository_1.ZaloMessageRepository])
], ZaloMessageService);
//# sourceMappingURL=zalo-message.service.js.map