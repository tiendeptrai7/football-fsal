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
exports.ZaloMessageAdminController = void 0;
const openapi = require("@nestjs/swagger");
const auth_jwt_decorator_1 = require("../../../auth/decorators/auth.jwt.decorator");
const request_params_decorator_1 = require("../../../common/request/decorators/params/request.params.decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const filter_zalo_message_dto_1 = require("../dtos/filter-zalo-message.dto");
const update_zalo_message_dto_1 = require("../dtos/update-zalo-message.dto");
const zalo_message_service_1 = require("../services/zalo-message.service");
let ZaloMessageAdminController = class ZaloMessageAdminController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getList(params) {
        return await this.service.getListOAMessage(params);
    }
    async getObserverList() {
        return await this.service.getObserverList();
    }
    async observeMessages(user, body) {
        return await this.service.observeMessage(user, body);
    }
    async export(params) {
        return await this.service.export(params);
    }
};
exports.ZaloMessageAdminController = ZaloMessageAdminController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'zalo_message_manage_observe' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_zalo_message_dto_1.FilterZaloMessageDto]),
    __metadata("design:returntype", Promise)
], ZaloMessageAdminController.prototype, "getList", null);
__decorate([
    (0, common_1.Get)('/observers'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'zalo_message_manage_observe' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ZaloMessageAdminController.prototype, "getObserverList", null);
__decorate([
    (0, common_1.Put)('/observes'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'zalo_message_manage_observe' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, request_params_decorator_1.AUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_zalo_message_dto_1.ObserveMessageDto]),
    __metadata("design:returntype", Promise)
], ZaloMessageAdminController.prototype, "observeMessages", null);
__decorate([
    (0, common_1.Get)('export'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'zalo_message_manage_observe' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_zalo_message_dto_1.FilterZaloMessageDto]),
    __metadata("design:returntype", Promise)
], ZaloMessageAdminController.prototype, "export", null);
exports.ZaloMessageAdminController = ZaloMessageAdminController = __decorate([
    (0, common_1.Controller)('zalo-messages'),
    (0, swagger_1.ApiTags)('Zalo message management'),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __metadata("design:paramtypes", [zalo_message_service_1.ZaloMessageService])
], ZaloMessageAdminController);
//# sourceMappingURL=zalo-message.admin.controller.js.map