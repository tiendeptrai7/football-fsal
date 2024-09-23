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
exports.FormQuestionPublicController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const filter_form_question_dto_1 = require("../dtos/filter-form-question.dto");
const form_question_service_1 = require("../services/form-question.service");
let FormQuestionPublicController = class FormQuestionPublicController {
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
};
exports.FormQuestionPublicController = FormQuestionPublicController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_form_question_dto_1.FilterFormQuestionDto]),
    __metadata("design:returntype", Promise)
], FormQuestionPublicController.prototype, "getList", null);
__decorate([
    (0, common_1.Get)(':id([0-9]+)'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../repository/entities/form-question.entity").FormQuestion }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FormQuestionPublicController.prototype, "getById", null);
exports.FormQuestionPublicController = FormQuestionPublicController = __decorate([
    (0, common_1.Controller)('form-questions'),
    (0, swagger_1.ApiTags)('Form-question'),
    __metadata("design:paramtypes", [form_question_service_1.FormQuestionService])
], FormQuestionPublicController);
//# sourceMappingURL=form-question.public.controller.js.map