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
exports.ZaloTokenService = void 0;
const zalo_constant_1 = require("../../../app/constant/zalo.constant");
const system_service_1 = require("../../system/services/system.service");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let ZaloTokenService = class ZaloTokenService {
    logger;
    systemService;
    httpService;
    constructor(logger, systemService, httpService) {
        this.logger = logger;
        this.systemService = systemService;
        this.httpService = httpService;
    }
    async getAccessToken() {
        const token = await this.systemService.getValueByKey('ZALO_OA_ACCESS_TOKEN', true);
        if (!token) {
            return await this.refreshToken();
        }
        return token;
    }
    async refreshToken() {
        try {
            const [refreshToken, appId, secretKey] = await Promise.all([
                await this.systemService.getValueByKey('ZALO_OA_REFRESH_TOKEN'),
                await this.systemService.getValueByKey('ZALO_APP_ID'),
                await this.systemService.getValueByKey('ZALO_APP_SECRET_KEY'),
            ]);
            const { data } = await (0, rxjs_1.lastValueFrom)(this.httpService.post(zalo_constant_1.ZALO_TOKEN_END_POINT, {
                refresh_token: refreshToken,
                app_id: appId,
                grant_type: 'refresh_token',
            }, {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    secret_key: secretKey,
                },
            }));
            if (data?.access_token && data?.refresh_token) {
                await Promise.all([
                    this.systemService.update({
                        key: 'ZALO_OA_ACCESS_TOKEN',
                        value: data.access_token,
                    }),
                    this.systemService.update({
                        key: 'ZALO_OA_REFRESH_TOKEN',
                        value: data.refresh_token,
                    }),
                ]);
            }
            return data.access_token;
        }
        catch (e) {
            this.logger.error('Error when refresh token zalo', e, 'ZaloTokenService.refreshToken');
        }
    }
};
exports.ZaloTokenService = ZaloTokenService;
exports.ZaloTokenService = ZaloTokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_1.Logger,
        system_service_1.SystemService,
        axios_1.HttpService])
], ZaloTokenService);
//# sourceMappingURL=zalo.token.service.js.map