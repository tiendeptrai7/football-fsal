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
exports.ZaloHookPublicController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const signature_guard_1 = require("../guards/signature.guard");
const zalo_hook_service_1 = require("../services/zalo.hook.service");
let ZaloHookPublicController = class ZaloHookPublicController {
    service;
    constructor(service) {
        this.service = service;
    }
    zaloHook(body) {
        this.service.processZaloHook(body).then();
    }
    zaloVerify(res) {
        return res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta name="zalo-platform-site-verification" content="EVAY6SE48Hy5cQGMmkv_A1hVxJ3sgJrjCJOs" />
    </head>
    <body>
    There Is No Limit To What You Can Accomplish Using Zalo!
    </body>
    </html>
    `);
    }
};
exports.ZaloHookPublicController = ZaloHookPublicController;
__decorate([
    (0, common_1.Post)('hook'),
    (0, common_1.UseGuards)(signature_guard_1.SignatureGuard),
    (0, common_1.HttpCode)(200),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ZaloHookPublicController.prototype, "zaloHook", null);
__decorate([
    (0, common_1.Get)('hook/zalo_verifierEVAY6SE48Hy5cQGMmkv_A1hVxJ3sgJrjCJOs.html'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ZaloHookPublicController.prototype, "zaloVerify", null);
exports.ZaloHookPublicController = ZaloHookPublicController = __decorate([
    (0, common_1.Controller)('zalo'),
    (0, swagger_1.ApiTags)('Zalo'),
    __metadata("design:paramtypes", [zalo_hook_service_1.ZaloHookService])
], ZaloHookPublicController);
//# sourceMappingURL=zalo-hook.public.controller.js.map