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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const request_params_decorator_1 = require("../../common/request/decorators/params/request.params.decorator");
const common_1 = require("@nestjs/common");
const passport_jwt_1 = require("passport-jwt");
const auth_enum_1 = require("../constants/auth.enum");
const auth_jwt_decorator_1 = require("../decorators/auth.jwt.decorator");
const change_password_dto_1 = require("../dtos/change-password.dto");
const forgot_password_dto_1 = require("../dtos/forgot-password.dto");
const auth_local_guard_1 = require("../guards/auth.local.guard");
const auth_service_1 = require("../services/auth.service");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async login(user) {
        return this.authService.token(user);
    }
    async refresh(user) {
        return this.authService.token(user);
    }
    async revoke(req) {
        const token = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        return this.authService.removeToken(token, auth_enum_1.EAuthType.access);
    }
    async forgotPassword(body) {
        return this.authService.forgotPassword(body);
    }
    async verifyEmailToken(body) {
        return this.authService.verifyEmailToken(body);
    }
    async resetPassword(body) {
        return this.authService.resetPassword(body);
    }
    async changePassword(body, user) {
        return this.authService.changePassword(body, user);
    }
    async checkAccount(body) {
        return await this.authService.checkAccount(body);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(auth_local_guard_1.AuthLocalGuard),
    (0, common_1.Post)('/token'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, request_params_decorator_1.AUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, auth_jwt_decorator_1.RefreshGuard)(),
    (0, common_1.Post)('/refresh'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, request_params_decorator_1.AUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, auth_jwt_decorator_1.Auth)(),
    (0, common_1.Post)('/revoke'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "revoke", null);
__decorate([
    (0, common_1.Post)('/forgot'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('/verify'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.VerifyEmailTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmailToken", null);
__decorate([
    (0, common_1.Post)('/reset-password'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, auth_jwt_decorator_1.Auth)(),
    (0, common_1.Post)('/change-password'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, request_params_decorator_1.AUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_password_dto_1.ChangePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('/check-accounts'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkAccount", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map