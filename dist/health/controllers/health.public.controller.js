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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthPublicController = void 0;
const openapi = require("@nestjs/swagger");
const mail_service_1 = require("../../common/mail/services/mail.service");
const message_service_1 = require("../../common/message/services/message.service");
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const nestjs_i18n_1 = require("nestjs-i18n");
let HealthPublicController = class HealthPublicController {
    health;
    memoryHealthIndicator;
    diskHealthIndicator;
    databaseIndicator;
    mailService;
    messageService;
    constructor(health, memoryHealthIndicator, diskHealthIndicator, databaseIndicator, mailService, i18nService) {
        this.health = health;
        this.memoryHealthIndicator = memoryHealthIndicator;
        this.diskHealthIndicator = diskHealthIndicator;
        this.databaseIndicator = databaseIndicator;
        this.mailService = mailService;
        this.messageService = new message_service_1.MessageService(i18nService, 'health');
    }
    checkMail(email) {
        this.mailService.sendBlankTemplate({
            email: [email],
            content: 'Email SMTP is working',
            subject: 'Novo Nordisk: Email SMTP Testing',
        });
    }
    async checkDatabase() {
        const data = await this.health.check([
            () => this.databaseIndicator.pingCheck('typeorm'),
        ]);
        return {
            data,
        };
    }
    async checkMemoryHeap() {
        const data = await this.health.check([
            () => this.memoryHealthIndicator.checkHeap('memoryHeap', 300 * 1024 * 1024),
        ]);
        return {
            data,
        };
    }
    async checkMemoryRss() {
        const data = await this.health.check([
            () => this.memoryHealthIndicator.checkRSS('memoryRss', 300 * 1024 * 1024),
        ]);
        return {
            data,
        };
    }
    async checkStorage() {
        const data = await this.health.check([
            () => this.diskHealthIndicator.checkStorage('diskHealth', {
                thresholdPercent: 0.75,
                path: '/',
            }),
        ]);
        return {
            data,
        };
    }
};
exports.HealthPublicController = HealthPublicController;
__decorate([
    (0, common_1.Get)('/mail'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HealthPublicController.prototype, "checkMail", null);
__decorate([
    (0, terminus_1.HealthCheck)(),
    (0, common_1.Get)('/database'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthPublicController.prototype, "checkDatabase", null);
__decorate([
    (0, terminus_1.HealthCheck)(),
    (0, common_1.Get)('/memory-heap'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthPublicController.prototype, "checkMemoryHeap", null);
__decorate([
    (0, terminus_1.HealthCheck)(),
    (0, common_1.Get)('/memory-rss'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthPublicController.prototype, "checkMemoryRss", null);
__decorate([
    (0, terminus_1.HealthCheck)(),
    (0, common_1.Get)('/storage'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthPublicController.prototype, "checkStorage", null);
exports.HealthPublicController = HealthPublicController = __decorate([
    (0, common_1.Controller)({
        version: common_1.VERSION_NEUTRAL,
        path: '/health',
    }),
    __metadata("design:paramtypes", [terminus_1.HealthCheckService,
        terminus_1.MemoryHealthIndicator,
        terminus_1.DiskHealthIndicator,
        terminus_1.TypeOrmHealthIndicator,
        mail_service_1.MailService,
        nestjs_i18n_1.I18nService])
], HealthPublicController);
//# sourceMappingURL=health.public.controller.js.map