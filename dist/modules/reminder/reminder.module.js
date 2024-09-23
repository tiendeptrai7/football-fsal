"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReminderModule = void 0;
const event_module_1 = require("../event/event.module");
const common_1 = require("@nestjs/common");
const reminder_repository_module_1 = require("./repository/reminder.repository.module");
const reminder_service_1 = require("./services/reminder.service");
let ReminderModule = class ReminderModule {
};
exports.ReminderModule = ReminderModule;
exports.ReminderModule = ReminderModule = __decorate([
    (0, common_1.Module)({
        imports: [reminder_repository_module_1.ReminderRepositoryModule, event_module_1.EventModule],
        exports: [reminder_service_1.ReminderService],
        providers: [reminder_service_1.ReminderService],
        controllers: [],
    })
], ReminderModule);
//# sourceMappingURL=reminder.module.js.map