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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const app_enum_1 = require("../../../app/constant/app.enum");
const string_util_1 = require("../../utils/string.util");
const system_repository_1 = require("../../../modules/system/repository/repositories/system.repository");
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const bullmq_2 = require("bullmq");
const nodemailer_1 = __importDefault(require("nodemailer"));
const reset_password_template_1 = require("../templates/reset-password-template");
let MailService = class MailService {
    logger;
    systemRepository;
    mailQueue;
    mailConfig;
    constructor(logger, systemRepository, mailQueue) {
        this.logger = logger;
        this.systemRepository = systemRepository;
        this.mailQueue = mailQueue;
    }
    sendBlankTemplate(parameter) {
        const options = {
            subject: parameter.subject,
            mailTo: parameter.email,
            content: parameter.content,
        };
        this._sendMail(options).then();
    }
    sendResetPassword(data) {
        const content = (0, string_util_1.stringReplacer)(reset_password_template_1.resetPasswordHtml, {
            ...data,
        });
        const options = {
            subject: reset_password_template_1.resetPasswordSubject,
            mailTo: [data.email],
            content: content,
        };
        this._sendMail(options).then();
    }
    async sendNoReply(data) {
        try {
            const transporter = await this._getTransporter();
            const from = `"${this.mailConfig?.email_name}" <${this.mailConfig?.sender_email}>`;
            const { subject, mailTo, content, attachments, cc } = data;
            await transporter.sendMail({
                from,
                to: mailTo.join(),
                subject,
                html: content,
                attachments,
                cc,
            });
        }
        catch (e) {
            this.logger.error('Error when send no-reply mail ', e, 'MailService.sendNoReply');
        }
    }
    async _sendMail(input) {
        for (const email of input.mailTo) {
            await this.mailQueue.add('send-mail', {
                subject: input.subject,
                mailTo: [email],
                content: input.content,
                attachments: input.attachments || [],
                cc: input.cc || [],
            }, {
                removeOnComplete: true,
                attempts: 5,
            });
        }
    }
    async _getMailConfig() {
        const mailCfgRaw = await this.systemRepository.findBy({
            group: 'EMAIL_SMTP',
            status: app_enum_1.EStatus.active,
        });
        if (!mailCfgRaw) {
            return null;
        }
        const mailCfg = {};
        for (const item of mailCfgRaw) {
            mailCfg[item.key.toLowerCase()] = item.value[0];
        }
        this.mailConfig = mailCfg;
        return mailCfg;
    }
    async _getTransporter() {
        const mailConfig = await this._getMailConfig();
        if (!mailConfig) {
            return null;
        }
        return nodemailer_1.default.createTransport({
            port: +mailConfig.port,
            host: mailConfig.host,
            auth: {
                user: mailConfig.username,
                pass: mailConfig.password,
            },
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, bullmq_1.InjectQueue)(process.env.REDIS_MAIL_QUEUE_NAME)),
    __metadata("design:paramtypes", [common_1.Logger,
        system_repository_1.SystemRepository,
        bullmq_2.Queue])
], MailService);
//# sourceMappingURL=mail.service.js.map