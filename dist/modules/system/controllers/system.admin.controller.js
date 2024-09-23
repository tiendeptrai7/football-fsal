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
exports.SystemAdminController = void 0;
const openapi = require("@nestjs/swagger");
const auth_jwt_decorator_1 = require("../../../auth/decorators/auth.jwt.decorator");
const paginate_response_decorator_1 = require("../../../common/response/decorators/paginate-response.decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_system_dto_1 = require("../dtos/create-system.dto");
const filter_system_dto_1 = require("../dtos/filter-system.dto");
const update_system_dto_1 = require("../dtos/update-system.dto");
const system_entity_1 = require("../repository/entities/system.entity");
const system_service_1 = require("../services/system.service");
let SystemAdminController = class SystemAdminController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(body) {
        return this.service.create(body);
    }
    async getList(param) {
        return await this.service.getList(param);
    }
    async getByKey(key) {
        return await this.service.getByKey(key);
    }
    async getById(id) {
        return await this.service.getById(id);
    }
    async update(body) {
        return await this.service.update(body);
    }
    async delete(id) {
        return await this.service.delete(id);
    }
};
exports.SystemAdminController = SystemAdminController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'system_manage_create' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_system_dto_1.CreateSystemDto]),
    __metadata("design:returntype", Promise)
], SystemAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'system_manage_read' }),
    (0, paginate_response_decorator_1.ApiPaginatedResponse)({ type: system_entity_1.System }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_system_dto_1.FilterSystemDto]),
    __metadata("design:returntype", Promise)
], SystemAdminController.prototype, "getList", null);
__decorate([
    (0, common_1.Get)('/by-key/:key'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'system_manage_read' }),
    (0, swagger_1.ApiOkResponse)({ type: system_entity_1.System }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../repository/entities/system.entity").System }),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SystemAdminController.prototype, "getByKey", null);
__decorate([
    (0, common_1.Get)(':id([0-9]+)'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'system_manage_read' }),
    (0, swagger_1.ApiOkResponse)({ type: system_entity_1.System }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../repository/entities/system.entity").System }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SystemAdminController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'system_manage_update' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_system_dto_1.UpdateSystemDto]),
    __metadata("design:returntype", Promise)
], SystemAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id([0-9]+)'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'system_manage_delete' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SystemAdminController.prototype, "delete", null);
exports.SystemAdminController = SystemAdminController = __decorate([
    (0, common_1.Controller)('system'),
    (0, swagger_1.ApiTags)('Systems'),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __metadata("design:paramtypes", [system_service_1.SystemService])
], SystemAdminController);
//# sourceMappingURL=system.admin.controller.js.map