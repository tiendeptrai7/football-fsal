"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const send_mail_processor_1 = require("./queues/send-mail.processor");
const mail_service_1 = require("./services/mail.service");
const system_repository_module_1 = require("../../modules/system/repository/system.repository.module");
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
let MailModule = class MailModule {
};
exports.MailModule = MailModule;
exports.MailModule = MailModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            bullmq_1.BullModule.registerQueue({
                name: process.env.REDIS_MAIL_QUEUE_NAME,
            }),
            system_repository_module_1.SystemRepositoryModule,
        ],
        exports: [mail_service_1.MailService],
        providers: [send_mail_processor_1.SendMailProcessor, mail_service_1.MailService],
    })
], MailModule);
//# sourceMappingURL=mail.module.js.map