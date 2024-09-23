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
exports.ZaloHookService = void 0;
const app_constant_1 = require("../../../app/constant/app.constant");
const message_service_1 = require("../../../common/message/services/message.service");
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const zalo_message_entity_1 = require("../repository/entities/zalo-message.entity");
const zalo_service_1 = require("./zalo.service");
let ZaloHookService = class ZaloHookService {
    logger;
    zaloService;
    zaloMessage;
    constructor(logger, i18nService, zaloService) {
        this.logger = logger;
        this.zaloService = zaloService;
        this.zaloMessage = new message_service_1.MessageService(i18nService, 'zalo');
    }
    async processZaloHook(body) {
        try {
            if (Object.values(app_constant_1.AppZaloEventTypes).includes(body.event_name)) {
                await this._recordMessage(body);
            }
        }
        catch (e) {
            this.logger.error(`Error when process zalo hook with payload ${JSON.stringify(body)}`, e, 'ZaloService.processZaloHook');
        }
    }
    async _recordMessage(body) {
        const { sender, event_name, recipient, message, timestamp } = body;
        const OA = await this.zaloService.getOa();
        const senderDetail = OA?.oaid === sender.id
            ? null
            : await this.zaloService.getUserDetail(sender.id);
        const recipientDetail = OA?.oaid === recipient.id
            ? null
            : await this.zaloService.getUserDetail(recipient.id);
        const obj = new zalo_message_entity_1.ZaloMessage();
        obj.from_id = senderDetail?.user_id ?? sender?.id;
        obj.from_avatar = senderDetail?.avatar ?? OA?.avatar ?? null;
        obj.from_display_name = senderDetail?.display_name ?? OA?.name ?? null;
        obj.to_id = recipientDetail?.user_id ?? recipient?.id;
        obj.to_avatar = recipientDetail?.avatar ?? OA?.avatar ?? null;
        obj.to_display_name = recipientDetail?.display_name ?? OA?.name ?? null;
        obj.event_name = event_name;
        obj.attachments = message.attachments
            ? JSON.stringify(message.attachments)
            : null;
        obj.message_id = message.msg_id;
        obj.message = message.text;
        obj.timestamp = +timestamp;
        obj.quote_message_id = message?.quote_msg_id;
        await obj.save();
    }
};
exports.ZaloHookService = ZaloHookService;
exports.ZaloHookService = ZaloHookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_1.Logger,
        nestjs_i18n_1.I18nService,
        zalo_service_1.ZaloService])
], ZaloHookService);
//# sourceMappingURL=zalo.hook.service.js.map