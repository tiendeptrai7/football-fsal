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
exports.ReminderPublicController = void 0;
const openapi = require("@nestjs/swagger");
const auth_jwt_decorator_1 = require("../../../auth/decorators/auth.jwt.decorator");
const request_params_decorator_1 = require("../../../common/request/decorators/params/request.params.decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const filter_reminder_dto_1 = require("../dtos/filter-reminder.dto");
const reminder_service_1 = require("../services/reminder.service");
let ReminderPublicController = class ReminderPublicController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getList(param, user) {
        return await this.service.getHistoryList(param, user);
    }
    async getById(id, user) {
        return await this.service.getHistoryById(id, user);
    }
};
exports.ReminderPublicController = ReminderPublicController;
__decorate([
    (0, common_1.Get)('histories'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ scope: 'mini_app' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, request_params_decorator_1.AUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_reminder_dto_1.FilterReminderPublicDto, Object]),
    __metadata("design:returntype", Promise)
], ReminderPublicController.prototype, "getList", null);
__decorate([
    (0, common_1.Get)(':id([0-9]+)'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ scope: 'mini_app' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../repository/entities/reminder-history.entity").ReminderHistory }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, request_params_decorator_1.AUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ReminderPublicController.prototype, "getById", null);
exports.ReminderPublicController = ReminderPublicController = __decorate([
    (0, common_1.Controller)('reminders'),
    (0, swagger_1.ApiTags)('reminders'),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __metadata("design:paramtypes", [reminder_service_1.ReminderService])
], ReminderPublicController);
//# sourceMappingURL=reminder.public.controller.js.map