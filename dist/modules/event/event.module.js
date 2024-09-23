"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModule = void 0;
const reminder_repository_module_1 = require("../reminder/repository/reminder.repository.module");
const common_1 = require("@nestjs/common");
const event_repository_module_1 = require("./repository/event.repository.module");
const event_service_1 = require("./services/event.service");
const event_guest_service_1 = require("./services/event-guest.service");
let EventModule = class EventModule {
};
exports.EventModule = EventModule;
exports.EventModule = EventModule = __decorate([
    (0, common_1.Module)({
        imports: [
            event_repository_module_1.EventRepositoryModule,
            reminder_repository_module_1.ReminderRepositoryModule,
        ],
        exports: [
            event_service_1.EventService,
            event_guest_service_1.EventGuestService,
            event_repository_module_1.EventRepositoryModule,
        ],
        providers: [
            event_service_1.EventService,
            event_guest_service_1.EventGuestService,
        ],
        controllers: [],
    })
], EventModule);
//# sourceMappingURL=event.module.js.map