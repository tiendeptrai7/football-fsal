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
exports.EventPublicController = void 0;
const openapi = require("@nestjs/swagger");
const auth_jwt_decorator_1 = require("../../../auth/decorators/auth.jwt.decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const filter_event_dto_1 = require("../dtos/filter-event.dto");
const event_service_1 = require("../services/event.service");
let EventPublicController = class EventPublicController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getList(param) {
        return await this.service.getListPublic(param);
    }
    async getById(id) {
        return await this.service.userGetById(id);
    }
};
exports.EventPublicController = EventPublicController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ scope: 'mini_app', anonymous: true }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_event_dto_1.FilterEventDto]),
    __metadata("design:returntype", Promise)
], EventPublicController.prototype, "getList", null);
__decorate([
    (0, common_1.Get)(':id([0-9]+)'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ scope: 'mini_app', anonymous: true }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../repository/entities/event.entity").Event }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventPublicController.prototype, "getById", null);
exports.EventPublicController = EventPublicController = __decorate([
    (0, common_1.Controller)('events'),
    (0, swagger_1.ApiTags)('Event public'),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __metadata("design:paramtypes", [event_service_1.EventService])
], EventPublicController);
//# sourceMappingURL=event.public.controller.js.map