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
exports.ReminderHistory = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../../app/constant/app.enum");
const base_entity_1 = require("../../../../common/database/entities/base.entity");
const event_guest_entity_1 = require("../../../event/repository/entities/event-guest.entity");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const reminder_entity_1 = require("./reminder.entity");
let ReminderHistory = class ReminderHistory extends base_entity_1.BaseEntity {
    reply_status;
    reminder_id;
    content;
    event_guest_id;
    event_guest;
    reminder;
    static _OPENAPI_METADATA_FACTORY() {
        return { reply_status: { required: true, enum: require("../../../../app/constant/app.enum").EStatus }, reminder_id: { required: true, type: () => Number }, content: { required: true, type: () => String }, event_guest_id: { required: true, type: () => Number }, event_guest: { required: true, type: () => require("../../../event/repository/entities/event-guest.entity").EventGuest }, reminder: { required: true, type: () => require("./reminder.entity").Reminder } };
    }
};
exports.ReminderHistory = ReminderHistory;
__decorate([
    (0, typeorm_1.Column)('tinyint', { default: app_enum_1.EStatus.inactive }),
    (0, swagger_1.ApiProperty)({ enum: app_enum_1.EStatus }),
    __metadata("design:type", Number)
], ReminderHistory.prototype, "reply_status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ReminderHistory.prototype, "reminder_id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReminderHistory.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ReminderHistory.prototype, "event_guest_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_guest_entity_1.EventGuest, (eq) => eq.reminders),
    (0, typeorm_1.JoinColumn)({ name: 'event_guest_id' }),
    __metadata("design:type", event_guest_entity_1.EventGuest)
], ReminderHistory.prototype, "event_guest", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => reminder_entity_1.Reminder, (r) => r.reminder_histories),
    (0, typeorm_1.JoinColumn)({ name: 'reminder_id' }),
    __metadata("design:type", reminder_entity_1.Reminder)
], ReminderHistory.prototype, "reminder", void 0);
exports.ReminderHistory = ReminderHistory = __decorate([
    (0, typeorm_1.Entity)()
], ReminderHistory);
//# sourceMappingURL=reminder-history.entity.js.map