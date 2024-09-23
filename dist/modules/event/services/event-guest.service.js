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
exports.EventGuestService = void 0;
const app_enum_1 = require("../../../app/constant/app.enum");
const custom_error_exception_1 = __importDefault(require("../../../common/error/exceptions/custom-error.exception"));
const excel_service_1 = require("../../../common/excel/services/excel.service");
const message_service_1 = require("../../../common/message/services/message.service");
const object_util_1 = require("../../../common/utils/object.util");
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const event_guest_repository_1 = require("../repository/repositories/event-guest.repository");
let EventGuestService = class EventGuestService {
    excelService;
    eventGuestRepository;
    eventMessage;
    constructor(excelService, eventGuestRepository, i18nService) {
        this.excelService = excelService;
        this.eventGuestRepository = eventGuestRepository;
        this.eventMessage = new message_service_1.MessageService(i18nService, 'event');
    }
    async getList(params) {
        const [data, count] = await this.eventGuestRepository.getList(params);
        return (0, object_util_1.wrapPagination)(data, count, params);
    }
    async getById(id) {
        const app = await this.eventGuestRepository.findOneBy({ id });
        if (!app) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.eventMessage.get('NOT_FOUND'));
        }
        return app;
    }
    async delete(id) {
        const app = await this.eventGuestRepository.findOne({
            where: { id },
        });
        if (!app) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.eventMessage.get('EVENT_GUEST_NOT_FOUND'));
        }
        await this.eventGuestRepository.delete(id);
    }
    async toggleQRCode(id) {
        const eventGuest = await this.getById(id);
        const qr_status = eventGuest.qr_status ? app_enum_1.EStatus.inactive : app_enum_1.EStatus.active;
        await this.eventGuestRepository.update({ id }, { qr_status });
    }
    async replyInvitation(user, body) {
        const eventGuest = await this.eventGuestRepository.findOneBy({
            qr_code: body.qr_code,
            qr_status: app_enum_1.EStatus.active,
        });
        if (!eventGuest) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.eventMessage.get('EVENT_GUEST_NOT_FOUND'));
        }
        Object.assign(eventGuest, { ...body });
        await this.eventGuestRepository.save(eventGuest);
    }
    async getListParticipantReport(params) {
        const [data, count] = await this.eventGuestRepository.getListParticipantReport(params);
        const reportData = data.map((d) => {
            if (d.submissions?.length > 0) {
                d.submissions = d.submissions.filter((submission) => {
                    return (submission?.form_question?.form_id === params.survey_id &&
                        submission?.form_question?.form_type === app_enum_1.EFormType.survey);
                });
            }
            return Object.assign(d, {
                submit_status: d.submissions?.length > 0 ? app_enum_1.EStatus.active : app_enum_1.EStatus.inactive,
                submit_time: d.submissions?.[0]?.created_at ?? null,
            });
        });
        return (0, object_util_1.wrapPagination)(reportData, count, params);
    }
    async getSurveyReportByUser(params, id) {
        const data = await this.eventGuestRepository.getSurveyReportByUser(params, id);
        return data;
    }
};
exports.EventGuestService = EventGuestService;
exports.EventGuestService = EventGuestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [excel_service_1.ExcelService,
        event_guest_repository_1.EventGuestRepository,
        nestjs_i18n_1.I18nService])
], EventGuestService);
//# sourceMappingURL=event-guest.service.js.map