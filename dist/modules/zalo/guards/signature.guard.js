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
exports.SignatureGuard = void 0;
const system_service_1 = require("../../system/services/system.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto_1 = __importDefault(require("crypto"));
let SignatureGuard = class SignatureGuard {
    systemService;
    constructor(configService, systemService) {
        this.systemService = systemService;
    }
    async canActivate(context) {
        const { headers, body } = context.switchToHttp().getRequest();
        const [appId, oaSecretKey] = await Promise.all([
            this.systemService.getValueByKey('ZALO_APP_ID'),
            this.systemService.getValueByKey('ZALO_WEBHOOK_OA_SECRET_KEY'),
        ]);
        if (!appId || !oaSecretKey) {
            return false;
        }
        const rawVerify = appId + JSON.stringify(body) + body.timestamp + oaSecretKey;
        const signature = headers['x-zevent-signature'];
        if (!signature) {
            return false;
        }
        const hash = `mac=${crypto_1.default
            .createHash('sha256')
            .update(rawVerify)
            .digest('hex')}`;
        return hash === signature;
    }
};
exports.SignatureGuard = SignatureGuard;
exports.SignatureGuard = SignatureGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        system_service_1.SystemService])
], SignatureGuard);
//# sourceMappingURL=signature.guard.js.map