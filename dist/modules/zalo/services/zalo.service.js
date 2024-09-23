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
exports.ZaloService = void 0;
const zalo_constant_1 = require("../../../app/constant/zalo.constant");
const zalo_token_service_1 = require("./zalo.token.service");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let ZaloService = class ZaloService {
    httpService;
    logger;
    zaloTokenService;
    constructor(httpService, logger, zaloTokenService) {
        this.httpService = httpService;
        this.logger = logger;
        this.zaloTokenService = zaloTokenService;
    }
    async getUserDetail(zaloID, isRetry) {
        const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(zalo_constant_1.ZALO_GET_USER_DETAIL_END_POINT, {
            headers: {
                'content-type': 'application/json',
                access_token: await this.zaloTokenService.getAccessToken(),
            },
            params: {
                data: `{"user_id":${zaloID}}`,
            },
        }));
        const responseData = response.data;
        if (responseData.error !== 0) {
            if (!isRetry) {
                return null;
            }
            const retryErrorCodes = [-216, -124];
            if (retryErrorCodes.includes(responseData.error)) {
                await this.zaloTokenService.refreshToken();
                await this.getUserDetail(zaloID);
            }
        }
        return {
            user_id: responseData?.data?.user_id,
            user_id_by_app: responseData?.data?.user_id_by_app,
            display_name: responseData?.data?.display_name,
            user_alias: responseData?.data?.user_alias,
            user_is_follower: responseData?.data?.user_is_follower,
            user_last_interaction_date: responseData?.data?.user_last_interaction_date,
            avatar: response?.data?.avatar,
        };
    }
    async getOa(isRetry) {
        const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(zalo_constant_1.ZALO_GET_OA_POINT, {
            headers: {
                'content-type': 'application/json',
                access_token: await this.zaloTokenService.getAccessToken(),
            },
        }));
        const responseData = response.data;
        if (responseData.error !== 0) {
            if (!isRetry) {
                return null;
            }
            const retryErrorCodes = [-216, -124];
            if (retryErrorCodes.includes(responseData.error)) {
                await this.zaloTokenService.refreshToken();
                await this.getOa();
            }
        }
        return responseData?.data;
    }
};
exports.ZaloService = ZaloService;
exports.ZaloService = ZaloService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        common_1.Logger,
        zalo_token_service_1.ZaloTokenService])
], ZaloService);
//# sourceMappingURL=zalo.service.js.map