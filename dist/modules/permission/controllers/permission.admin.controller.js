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
exports.PermissionAdminController = void 0;
const openapi = require("@nestjs/swagger");
const auth_jwt_decorator_1 = require("../../../auth/decorators/auth.jwt.decorator");
const request_params_decorator_1 = require("../../../common/request/decorators/params/request.params.decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_permission_dto_1 = require("../dtos/create-permission.dto");
const list_permission_dto_1 = require("../dtos/list-permission.dto");
const update_permission_dto_1 = require("../dtos/update-permission.dto");
const permission_service_1 = require("../services/permission.service");
let PermissionAdminController = class PermissionAdminController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(body) {
        return this.service.create(body);
    }
    async getAll() {
        return this.service.getAll();
    }
    async getMyPermission(user) {
        return this.service.getMyPermission(user);
    }
    async update(body) {
        return this.service.update(body);
    }
    async delete(id) {
        return this.service.delete(id);
    }
};
exports.PermissionAdminController = PermissionAdminController;
__decorate([
    (0, common_1.Post)(),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'permission_manage_create' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_permission_dto_1.CreatePermissionDto]),
    __metadata("design:returntype", Promise)
], PermissionAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, auth_jwt_decorator_1.Auth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ type: list_permission_dto_1.ListPermissionDto }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PermissionAdminController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/my-permission'),
    (0, auth_jwt_decorator_1.Auth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: [String] }),
    __param(0, (0, request_params_decorator_1.AUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PermissionAdminController.prototype, "getMyPermission", null);
__decorate([
    (0, common_1.Put)(),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'permission_manage_update' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_permission_dto_1.UpdatePermissionDto]),
    __metadata("design:returntype", Promise)
], PermissionAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id([0-9]+)'),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'permission_manage_delete' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PermissionAdminController.prototype, "delete", null);
exports.PermissionAdminController = PermissionAdminController = __decorate([
    (0, common_1.Controller)('permissions'),
    (0, swagger_1.ApiTags)('Permissions'),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __metadata("design:paramtypes", [permission_service_1.PermissionService])
], PermissionAdminController);
//# sourceMappingURL=permission.admin.controller.js.map