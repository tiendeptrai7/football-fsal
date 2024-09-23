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
exports.RefreshZaloTokenJob = void 0;
const zalo_token_service_1 = require("../../../../modules/zalo/services/zalo.token.service");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
let RefreshZaloTokenJob = class RefreshZaloTokenJob {
    logger;
    zaloTokenService;
    constructor(logger, zaloTokenService) {
        this.logger = logger;
        this.zaloTokenService = zaloTokenService;
    }
    handleCron() {
        this.logger.log(`Run refresh token zalo at ${new Date()}`);
        this.zaloTokenService
            .refreshToken()
            .then(() => {
            this.logger.log(`Run refresh token zalo done at ${new Date()}`);
        })
            .catch((error) => {
            this.logger.error(`Run refresh token zalo at ${new Date()}`, error);
        });
    }
};
exports.RefreshZaloTokenJob = RefreshZaloTokenJob;
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RefreshZaloTokenJob.prototype, "handleCron", null);
exports.RefreshZaloTokenJob = RefreshZaloTokenJob = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_1.Logger,
        zalo_token_service_1.ZaloTokenService])
], RefreshZaloTokenJob);
//# sourceMappingURL=refresh-token.job.js.map