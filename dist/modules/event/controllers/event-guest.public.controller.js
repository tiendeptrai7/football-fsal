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
exports.EventGuestPublicController = void 0;
const openapi = require("@nestjs/swagger");
const auth_jwt_decorator_1 = require("../../../auth/decorators/auth.jwt.decorator");
const request_params_decorator_1 = require("../../../common/request/decorators/params/request.params.decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const filter_event_guest_dto_1 = require("../dtos/filter-event-guest.dto");
const update_event_guest_dto_1 = require("../dtos/update-event-guest.dto");
const event_guest_service_1 = require("../services/event-guest.service");
let EventGuestPublicController = class EventGuestPublicController {
    service;
    constructor(service) {
        this.service = service;
    }
    async replyInvitation(user, body) {
        return await this.service.replyInvitation(user, body);
    }
    async getGuestList(param) {
        return await this.service.getList(param);
    }
};
exports.EventGuestPublicController = EventGuestPublicController;
__decorate([
    (0, common_1.Put)('/invitations'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ scope: 'mini_app' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, request_params_decorator_1.AUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_event_guest_dto_1.UpdateInvitationDto]),
    __metadata("design:returntype", Promise)
], EventGuestPublicController.prototype, "replyInvitation", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ scope: 'mini_app' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_event_guest_dto_1.FilterEventGuestDto]),
    __metadata("design:returntype", Promise)
], EventGuestPublicController.prototype, "getGuestList", null);
exports.EventGuestPublicController = EventGuestPublicController = __decorate([
    (0, common_1.Controller)('event-guests'),
    (0, swagger_1.ApiTags)('Event Guest public'),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __metadata("design:paramtypes", [event_guest_service_1.EventGuestService])
], EventGuestPublicController);
//# sourceMappingURL=event-guest.public.controller.js.map