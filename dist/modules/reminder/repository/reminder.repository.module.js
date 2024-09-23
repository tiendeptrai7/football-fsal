"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReminderRepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reminder_entity_1 = require("./entities/reminder.entity");
const reminder_repository_1 = require("./repositories/reminder.repository");
const reminder_history_repository_1 = require("./repositories/reminder-history.repository");
let ReminderRepositoryModule = class ReminderRepositoryModule {
};
exports.ReminderRepositoryModule = ReminderRepositoryModule;
exports.ReminderRepositoryModule = ReminderRepositoryModule = __decorate([
    (0, common_1.Module)({
        providers: [reminder_repository_1.ReminderRepository, reminder_history_repository_1.ReminderHistoryRepository],
        exports: [reminder_repository_1.ReminderRepository, reminder_history_repository_1.ReminderHistoryRepository],
        imports: [typeorm_1.TypeOrmModule.forFeature([reminder_entity_1.Reminder])],
    })
], ReminderRepositoryModule);
//# sourceMappingURL=reminder.repository.module.js.map