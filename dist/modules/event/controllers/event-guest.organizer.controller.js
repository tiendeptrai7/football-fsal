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
exports.EventGuestOrganizerController = void 0;
const openapi = require("@nestjs/swagger");
const auth_jwt_decorator_1 = require("../../../auth/decorators/auth.jwt.decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const filter_event_guest_dto_1 = require("../dtos/filter-event-guest.dto");
const event_guest_service_1 = require("../services/event-guest.service");
let EventGuestOrganizerController = class EventGuestOrganizerController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getGuestList(param) {
        return await this.service.getList(param);
    }
};
exports.EventGuestOrganizerController = EventGuestOrganizerController;
__decorate([
    (0, common_1.Get)('/'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_jwt_decorator_1.Auth)({ scope: 'web', roles: ['organizer'] }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_event_guest_dto_1.FilterEventGuestDto]),
    __metadata("design:returntype", Promise)
], EventGuestOrganizerController.prototype, "getGuestList", null);
exports.EventGuestOrganizerController = EventGuestOrganizerController = __decorate([
    (0, common_1.Controller)('event-guests'),
    (0, swagger_1.ApiTags)('Event Guest organizer'),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __metadata("design:paramtypes", [event_guest_service_1.EventGuestService])
], EventGuestOrganizerController);
//# sourceMappingURL=event-guest.organizer.controller.js.map