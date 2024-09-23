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
exports.UserAdminController = void 0;
const openapi = require("@nestjs/swagger");
const auth_jwt_decorator_1 = require("../../../auth/decorators/auth.jwt.decorator");
const request_params_decorator_1 = require("../../../common/request/decorators/params/request.params.decorator");
const paginate_response_decorator_1 = require("../../../common/response/decorators/paginate-response.decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("../dtos/create-user.dto");
const filter_user_dto_1 = require("../dtos/filter-user.dto");
const update_user_dto_1 = require("../dtos/update-user.dto");
const user_entity_1 = require("../repository/entities/user.entity");
const user_service_1 = require("../services/user.service");
let UserAdminController = class UserAdminController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(body) {
        await this.service.create(body);
    }
    async getList(param) {
        return await this.service.getList(param);
    }
    async myProfile(user) {
        return await this.service.myProfile(user);
    }
    async getListZaloUser(param) {
        return await this.service.getListZaloUser(param);
    }
    async getZaloUserById(id) {
        return await this.service.getZaloUserById(id);
    }
    async getById(id) {
        return await this.service.getById(id);
    }
    async update(body) {
        await this.service.update(body);
    }
    async toggleStatus(id) {
        await this.service.toggleStatus(id);
    }
    async resetPassword(body) {
        await this.service.resetLock(body);
    }
    async delete(id) {
        await this.service.delete(id);
    }
};
exports.UserAdminController = UserAdminController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'user_manage_create' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'user_manage_read' }),
    (0, paginate_response_decorator_1.ApiPaginatedResponse)({ type: user_entity_1.User }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_user_dto_1.FilterUserDto]),
    __metadata("design:returntype", Promise)
], UserAdminController.prototype, "getList", null);
__decorate([
    (0, common_1.Get)('/my-profile'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ scope: 'admin' }),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.User }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../repository/entities/user.entity").User }),
    __param(0, (0, request_params_decorator_1.AUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserAdminController.prototype, "myProfile", null);
__decorate([
    (0, common_1.Get)('zalo'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'zalo_user_manage_read' }),
    (0, paginate_response_decorator_1.ApiPaginatedResponse)({ type: user_entity_1.User }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_user_dto_1.FilterZaloUserDto]),
    __metadata("design:returntype", Promise)
], UserAdminController.prototype, "getListZaloUser", null);
__decorate([
    (0, common_1.Get)('zalo/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'zalo_user_manage_read' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../repository/entities/profile.entity").Profile }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserAdminController.prototype, "getZaloUserById", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'user_manage_read' }),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.User }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../repository/entities/user.entity").User }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserAdminController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'user_manage_update' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('/toggle/status/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'user_manage_update' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserAdminController.prototype, "toggleStatus", null);
__decorate([
    (0, common_1.Put)('/reset-lock'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'user_manage_update' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.ResetLockDto]),
    __metadata("design:returntype", Promise)
], UserAdminController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'user_manage_delete' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserAdminController.prototype, "delete", null);
exports.UserAdminController = UserAdminController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('Users'),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserAdminController);
//# sourceMappingURL=user.admin.controller.js.map