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
exports.UserPublicController = void 0;
const openapi = require("@nestjs/swagger");
const auth_jwt_decorator_1 = require("../../../auth/decorators/auth.jwt.decorator");
const request_params_decorator_1 = require("../../../common/request/decorators/params/request.params.decorator");
const user_entity_1 = require("../repository/entities/user.entity");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const update_user_dto_1 = require("../dtos/update-user.dto");
const user_service_1 = require("../services/user.service");
let UserPublicController = class UserPublicController {
    service;
    constructor(service) {
        this.service = service;
    }
    async myProfile(user) {
        return await this.service.myProfile(user);
    }
    async updateProfile(body, user) {
        return await this.service.updateProfile(body, user);
    }
    async followOA(body, user) {
        return await this.service.followOA(body, user);
    }
};
exports.UserPublicController = UserPublicController;
__decorate([
    (0, common_1.Get)('/my-profile'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ scope: 'mini_app' }),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.User }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../repository/entities/user.entity").User }),
    __param(0, (0, request_params_decorator_1.AUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserPublicController.prototype, "myProfile", null);
__decorate([
    (0, common_1.Put)('/my-profile'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ scope: 'mini_app' }),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.User }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, request_params_decorator_1.AUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateProfileDto, Object]),
    __metadata("design:returntype", Promise)
], UserPublicController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Put)('/follow-oa'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_jwt_decorator_1.Auth)({ scope: 'mini_app' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, request_params_decorator_1.AUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.FollowOADto, Object]),
    __metadata("design:returntype", Promise)
], UserPublicController.prototype, "followOA", null);
exports.UserPublicController = UserPublicController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('Users'),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserPublicController);
//# sourceMappingURL=user.public.controller.js.map