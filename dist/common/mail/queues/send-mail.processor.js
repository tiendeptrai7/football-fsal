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
exports.SendMailProcessor = void 0;
const mail_service_1 = require("../services/mail.service");
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const bullmq_2 = require("bullmq");
let SendMailProcessor = class SendMailProcessor extends bullmq_1.WorkerHost {
    logger;
    mailService;
    constructor(logger, mailService) {
        super();
        this.logger = logger;
        this.mailService = mailService;
    }
    onQueueActive(job) {
        this.logger.log(`Job has been started: ${job.id}`, 'SendMailProcessor.onQueueActive');
    }
    onQueueComplete(job) {
        this.logger.log(`Job has been finished: ${job.id}`, 'SendMailProcessor.onQueueComplete');
    }
    onQueueFailed(job, err) {
        this.logger.error(`Job has been failed: ${job.id} with data ${JSON.stringify(job.data)}`, err, 'SendMailProcessor.onQueueFailed');
    }
    onQueueError(e) {
        this.logger.error(`Job has got error `, e, 'SendMailProcessor.onQueueError');
    }
    onQueueStalled(job) {
        this.logger.log(`Job has been stalled: ${job.id}`, 'SendMailProcessor.onQueueStalled');
    }
    async process(job) {
        await this.mailService.sendNoReply(job.data);
    }
};
exports.SendMailProcessor = SendMailProcessor;
__decorate([
    (0, bullmq_1.OnWorkerEvent)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_2.Job]),
    __metadata("design:returntype", void 0)
], SendMailProcessor.prototype, "onQueueActive", null);
__decorate([
    (0, bullmq_1.OnWorkerEvent)('completed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_2.Job]),
    __metadata("design:returntype", void 0)
], SendMailProcessor.prototype, "onQueueComplete", null);
__decorate([
    (0, bullmq_1.OnWorkerEvent)('failed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_2.Job, Object]),
    __metadata("design:returntype", void 0)
], SendMailProcessor.prototype, "onQueueFailed", null);
__decorate([
    (0, bullmq_1.OnWorkerEvent)('error'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SendMailProcessor.prototype, "onQueueError", null);
__decorate([
    (0, bullmq_1.OnWorkerEvent)('stalled'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_2.Job]),
    __metadata("design:returntype", void 0)
], SendMailProcessor.prototype, "onQueueStalled", null);
exports.SendMailProcessor = SendMailProcessor = __decorate([
    (0, bullmq_1.Processor)(process.env.REDIS_MAIL_QUEUE_NAME, {
        concurrency: 10,
        limiter: {
            max: 2,
            duration: 60000,
        },
    }),
    __metadata("design:paramtypes", [common_1.Logger,
        mail_service_1.MailService])
], SendMailProcessor);
//# sourceMappingURL=send-mail.processor.js.map