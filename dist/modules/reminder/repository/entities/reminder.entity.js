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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reminder = void 0;
const openapi = require("@nestjs/swagger");
const base_entity_1 = require("../../../../common/database/entities/base.entity");
const event_entity_1 = require("../../../event/repository/entities/event.entity");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const reminder_history_entity_1 = require("./reminder-history.entity");
let Reminder = class Reminder extends base_entity_1.BaseEntity {
    reminder_days_before;
    reminder_expire_days;
    reminder_sent_at;
    reminder_expire_at;
    event_id;
    event;
    reminder_histories;
    static _OPENAPI_METADATA_FACTORY() {
        return { reminder_days_before: { required: true, type: () => Number }, reminder_expire_days: { required: true, type: () => Number }, reminder_sent_at: { required: true, type: () => Date }, reminder_expire_at: { required: true, type: () => Date }, event_id: { required: true, type: () => Number }, event: { required: true, type: () => require("../../../event/repository/entities/event.entity").Event }, reminder_histories: { required: true, type: () => [require("./reminder-history.entity").ReminderHistory] } };
    }
};
exports.Reminder = Reminder;
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Reminder.prototype, "reminder_days_before", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Reminder.prototype, "reminder_expire_days", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Reminder.prototype, "reminder_sent_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Reminder.prototype, "reminder_expire_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Reminder.prototype, "event_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_entity_1.Event, (event) => event.reminders),
    (0, typeorm_1.JoinColumn)({ name: 'event_id' }),
    __metadata("design:type", event_entity_1.Event)
], Reminder.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reminder_history_entity_1.ReminderHistory, (reminder) => reminder.reminder),
    __metadata("design:type", Array)
], Reminder.prototype, "reminder_histories", void 0);
exports.Reminder = Reminder = __decorate([
    (0, typeorm_1.Entity)()
], Reminder);
//# sourceMappingURL=reminder.entity.js.map