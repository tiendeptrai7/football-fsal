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
exports.SurveyAdminController = void 0;
const openapi = require("@nestjs/swagger");
const auth_jwt_decorator_1 = require("../../../auth/decorators/auth.jwt.decorator");
const base_filter_dto_1 = require("../../../common/database/dtos/base-filter.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const chart_report_dto_1 = require("../dtos/chart-report.dto");
const create_survey_dto_1 = require("../dtos/create-survey.dto");
const filter_survey_dto_1 = require("../dtos/filter-survey.dto");
const participant_report_filter_dto_1 = require("../dtos/participant-report-filter.dto");
const update_survey_dto_1 = require("../dtos/update-survey.dto");
const survey_admin_service_1 = require("../services/survey.admin.service");
let SurveyAdminController = class SurveyAdminController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getList(param) {
        return await this.service.getList(param);
    }
    async create(body) {
        return this.service.create(body);
    }
    async getById(id) {
        return await this.service.getById(id);
    }
    async copy(id) {
        return this.service.copy(id);
    }
    async update(body) {
        return await this.service.update(body);
    }
    async toggle(id) {
        return await this.service.toggle(id);
    }
    async getListReport(param) {
        return await this.service.getListRport(param);
    }
    async getListParticipantReport(param) {
        return await this.service.getListParticipantReport(param);
    }
    async getOverviewReport(id) {
        return await this.service.getOverviewReport(id);
    }
    async getDetailReport(id) {
        return await this.service.getDetailReport(id);
    }
    async getBarChart(id, param) {
        return await this.service.getBarChart(param, id);
    }
    async getShortAnswer(id, param) {
        return await this.service.getShortAnswer(param, id);
    }
    async getLineChart(id, param) {
        return await this.service.getLineChart(param, id);
    }
};
exports.SurveyAdminController = SurveyAdminController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'survey_manage_read' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_survey_dto_1.FilterSurveyDto]),
    __metadata("design:returntype", Promise)
], SurveyAdminController.prototype, "getList", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'survey_manage_create' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_survey_dto_1.CreateSurveyFormDto]),
    __metadata("design:returntype", Promise)
], SurveyAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id([0-9]+)'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'survey_manage_read' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../repository/entities/survey.entity").Survey }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SurveyAdminController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)('copy/:id([0-9]+)'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'survey_manage_create' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SurveyAdminController.prototype, "copy", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'survey_manage_update' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_survey_dto_1.UpdateSurveyFormDto]),
    __metadata("design:returntype", Promise)
], SurveyAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('toggle/status/:id([0-9]+)'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'survey_manage_update' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SurveyAdminController.prototype, "toggle", null);
__decorate([
    (0, common_1.Get)('reports'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'survey_report_manage_read' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [base_filter_dto_1.BaseFilterParamDto]),
    __metadata("design:returntype", Promise)
], SurveyAdminController.prototype, "getListReport", null);
__decorate([
    (0, common_1.Get)('reports/participants'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'survey_report_manage_read' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [participant_report_filter_dto_1.FilterParticipantDto]),
    __metadata("design:returntype", Promise)
], SurveyAdminController.prototype, "getListParticipantReport", null);
__decorate([
    (0, common_1.Get)('reports/overview/:id([0-9]+)'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'survey_report_manage_read' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SurveyAdminController.prototype, "getOverviewReport", null);
__decorate([
    (0, common_1.Get)('reports/detail/:id([0-9]+)'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'survey_report_manage_read' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: [Object] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SurveyAdminController.prototype, "getDetailReport", null);
__decorate([
    (0, common_1.Get)('reports/detail/bar-chart/:id([0-9]+)'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'survey_report_manage_read' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, chart_report_dto_1.ChartDto]),
    __metadata("design:returntype", Promise)
], SurveyAdminController.prototype, "getBarChart", null);
__decorate([
    (0, common_1.Get)('reports/detail/short-answer/:id([0-9]+)'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'survey_report_manage_read' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: [Object] }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, chart_report_dto_1.ChartDto]),
    __metadata("design:returntype", Promise)
], SurveyAdminController.prototype, "getShortAnswer", null);
__decorate([
    (0, common_1.Get)('reports/detail/line-chart/:id([0-9]+)'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ permissions: 'survey_report_manage_read' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, chart_report_dto_1.ChartDto]),
    __metadata("design:returntype", Promise)
], SurveyAdminController.prototype, "getLineChart", null);
exports.SurveyAdminController = SurveyAdminController = __decorate([
    (0, common_1.Controller)('surveys'),
    (0, swagger_1.ApiTags)('Survey management'),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __metadata("design:paramtypes", [survey_admin_service_1.SurveyAdminService])
], SurveyAdminController);
//# sourceMappingURL=survey.admin.controller.js.map