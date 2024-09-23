"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesOrganizerModule = void 0;
const event_organizer_controller_1 = require("../../modules/event/controllers/event.organizer.controller");
const event_guest_organizer_controller_1 = require("../../modules/event/controllers/event-guest.organizer.controller");
const event_module_1 = require("../../modules/event/event.module");
const permission_module_1 = require("../../modules/permission/permission.module");
const common_1 = require("@nestjs/common");
let RoutesOrganizerModule = class RoutesOrganizerModule {
};
exports.RoutesOrganizerModule = RoutesOrganizerModule;
exports.RoutesOrganizerModule = RoutesOrganizerModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            event_organizer_controller_1.EventOrganizerController,
            event_guest_organizer_controller_1.EventGuestOrganizerController,
        ],
        providers: [],
        exports: [],
        imports: [event_module_1.EventModule, permission_module_1.PermissionModule],
    })
], RoutesOrganizerModule);
//# sourceMappingURL=routes.organizer.module.js.map