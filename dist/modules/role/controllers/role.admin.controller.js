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
exports.RoleAdminController = void 0;
const openapi = require("@nestjs/swagger");
const auth_jwt_decorator_1 = require("../../../auth/decorators/auth.jwt.decorator");
const paginate_response_decorator_1 = require("../../../common/response/decorators/paginate-response.decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_role_dto_1 = require("../dtos/create-role.dto");
const filter_role_dto_1 = require("../dtos/filter-role.dto");
const update_role_dto_1 = require("../dtos/update-role.dto");
const role_entity_1 = require("../repository/entities/role.entity");
const role_service_1 = require("../services/role.service");
let RoleAdminController = class RoleAdminController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(body) {
        return await this.service.create(body);
    }
    async getById(id) {
        return await this.service.getById(id);
    }
    async getList(param) {
        return await this.service.getList(param);
    }
    async getAll() {
        return await this.service.getAll();
    }
    async update(body) {
        return await this.service.update(body);
    }
    async delete(id) {
        return this.service.delete(id);
    }
    async toggle(id) {
        return await this.service.toggle(id);
    }
};
exports.RoleAdminController = RoleAdminController;
__decorate([
    (0, common_1.Post)(),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'role_manage_create' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_dto_1.CreateRoleDto]),
    __metadata("design:returntype", Promise)
], RoleAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/:id([0-9]+)'),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'role_manage_read' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ type: role_entity_1.Role }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleAdminController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)(),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'role_manage_read' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, paginate_response_decorator_1.ApiPaginatedResponse)({ type: role_entity_1.Role }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_role_dto_1.FilterRoleDto]),
    __metadata("design:returntype", Promise)
], RoleAdminController.prototype, "getList", null);
__decorate([
    (0, common_1.Get)('/all'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)(),
    (0, swagger_1.ApiOkResponse)({ type: role_entity_1.Role, isArray: true }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: [require("../repository/entities/role.entity").Role] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoleAdminController.prototype, "getAll", null);
__decorate([
    (0, common_1.Put)(),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'role_manage_update' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_role_dto_1.UpdateRoleDto]),
    __metadata("design:returntype", Promise)
], RoleAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id([0-9]+)'),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'role_manage_delete' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleAdminController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)('toggle/status/:id([0-9]+)'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'role_manage_update' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleAdminController.prototype, "toggle", null);
exports.RoleAdminController = RoleAdminController = __decorate([
    (0, common_1.Controller)('roles'),
    (0, swagger_1.ApiTags)('Roles'),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleAdminController);
//# sourceMappingURL=role.admin.controller.js.map