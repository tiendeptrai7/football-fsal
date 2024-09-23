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
exports.FeedbackAdminController = void 0;
const openapi = require("@nestjs/swagger");
const auth_jwt_decorator_1 = require("../../../auth/decorators/auth.jwt.decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_feedback_dto_1 = require("../dtos/create-feedback.dto");
const filter_feedback_dto_1 = require("../dtos/filter-feedback.dto");
const update_feedback_dto_1 = require("../dtos/update-feedback.dto");
const feedback_service_1 = require("../services/feedback.service");
let FeedbackAdminController = class FeedbackAdminController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getList(param) {
        return await this.service.getList(param);
    }
    async getById(id) {
        return await this.service.getById(id);
    }
    async create(body) {
        return await this.service.create(body);
    }
    async update(body) {
        return await this.service.update(body);
    }
    async toggle(id) {
        return await this.service.toggle(id);
    }
};
exports.FeedbackAdminController = FeedbackAdminController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'feedback_manage_read' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_feedback_dto_1.FilterFeedbackDto]),
    __metadata("design:returntype", Promise)
], FeedbackAdminController.prototype, "getList", null);
__decorate([
    (0, common_1.Get)(':id([0-9]+)'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'feedback_manage_read' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../repository/entities/feedback.entity").Feedback }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FeedbackAdminController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'feedback_manage_create' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_feedback_dto_1.CreateFeedbackDto]),
    __metadata("design:returntype", Promise)
], FeedbackAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'feedback_manage_update' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_feedback_dto_1.UpdateFeedbackDto]),
    __metadata("design:returntype", Promise)
], FeedbackAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('toggle/status/:id([0-9]+)'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'feedback_manage_update' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FeedbackAdminController.prototype, "toggle", null);
exports.FeedbackAdminController = FeedbackAdminController = __decorate([
    (0, common_1.Controller)('feedbacks'),
    (0, swagger_1.ApiTags)('Feedback management'),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __metadata("design:paramtypes", [feedback_service_1.FeedbackService])
], FeedbackAdminController);
//# sourceMappingURL=feedback.admin.controller.js.map