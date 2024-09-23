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
exports.FormQuestionAdminController = void 0;
const openapi = require("@nestjs/swagger");
const auth_jwt_decorator_1 = require("../../../auth/decorators/auth.jwt.decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const filter_form_question_dto_1 = require("../dtos/filter-form-question.dto");
const form_question_service_1 = require("../services/form-question.service");
let FormQuestionAdminController = class FormQuestionAdminController {
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
    async delete(id) {
        return await this.service.delete(id);
    }
};
exports.FormQuestionAdminController = FormQuestionAdminController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'form-question_manage_read' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_form_question_dto_1.FilterFormQuestionDto]),
    __metadata("design:returntype", Promise)
], FormQuestionAdminController.prototype, "getList", null);
__decorate([
    (0, common_1.Get)(':id([0-9]+)'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'form-question_manage_read' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../repository/entities/form-question.entity").FormQuestion }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FormQuestionAdminController.prototype, "getById", null);
__decorate([
    (0, common_1.Delete)(':id([0-9]+)'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'form-question_manage_delete' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FormQuestionAdminController.prototype, "delete", null);
exports.FormQuestionAdminController = FormQuestionAdminController = __decorate([
    (0, common_1.Controller)('form-questions'),
    (0, swagger_1.ApiTags)('Form-Question'),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __metadata("design:paramtypes", [form_question_service_1.FormQuestionService])
], FormQuestionAdminController);
//# sourceMappingURL=form-question.admin.controller.js.map