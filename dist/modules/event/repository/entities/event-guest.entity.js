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
exports.EventGuest = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../../app/constant/app.enum");
const base_entity_1 = require("../../../../common/database/entities/base.entity");
const submission_entity_1 = require("../../../form-question/repository/entities/submission.entity");
const reminder_history_entity_1 = require("../../../reminder/repository/entities/reminder-history.entity");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const event_entity_1 = require("./event.entity");
let EventGuest = class EventGuest extends base_entity_1.BaseEntity {
    event_id;
    hcp_id;
    qr_code;
    qr_status;
    invitation_time_at;
    reply_status;
    is_eligible;
    event;
    submissions;
    reminders;
    checked_in_at;
    ref_id;
    ref;
    introduced_guests;
    static _OPENAPI_METADATA_FACTORY() {
        return { event_id: { required: true, type: () => Number }, hcp_id: { required: true, type: () => Number }, qr_code: { required: true, type: () => String }, qr_status: { required: true, enum: require("../../../../app/constant/app.enum").EStatus }, invitation_time_at: { required: true, type: () => Date }, reply_status: { required: true, enum: require("../../../../app/constant/app.enum").EReplyStatus }, is_eligible: { required: true, enum: require("../../../../app/constant/app.enum").EStatus }, event: { required: true, type: () => require("./event.entity").Event }, submissions: { required: true, type: () => [require("../../../form-question/repository/entities/submission.entity").Submission] }, reminders: { required: true, type: () => [require("../../../reminder/repository/entities/reminder-history.entity").ReminderHistory] }, checked_in_at: { required: true, type: () => Date }, ref_id: { required: true, type: () => Number }, ref: { required: true, type: () => require("./event-guest.entity").EventGuest }, introduced_guests: { required: true, type: () => [require("./event-guest.entity").EventGuest] } };
    }
};
exports.EventGuest = EventGuest;
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], EventGuest.prototype, "event_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], EventGuest.prototype, "hcp_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EventGuest.prototype, "qr_code", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { default: app_enum_1.EStatus.active }),
    (0, swagger_1.ApiProperty)({ enum: app_enum_1.EStatus }),
    __metadata("design:type", Number)
], EventGuest.prototype, "qr_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], EventGuest.prototype, "invitation_time_at", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { default: app_enum_1.EReplyStatus.pending }),
    (0, swagger_1.ApiProperty)({ enum: app_enum_1.EReplyStatus }),
    __metadata("design:type", Number)
], EventGuest.prototype, "reply_status", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { default: app_enum_1.EStatus.inactive }),
    (0, swagger_1.ApiProperty)({ enum: app_enum_1.EStatus }),
    __metadata("design:type", Number)
], EventGuest.prototype, "is_eligible", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_entity_1.Event, (event) => event.event_guest),
    (0, typeorm_1.JoinColumn)({ name: 'event_id' }),
    __metadata("design:type", event_entity_1.Event)
], EventGuest.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => submission_entity_1.Submission, (submission) => submission.event_guest),
    __metadata("design:type", Array)
], EventGuest.prototype, "submissions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reminder_history_entity_1.ReminderHistory, (reminder) => reminder.event_guest),
    __metadata("design:type", Array)
], EventGuest.prototype, "reminders", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], EventGuest.prototype, "checked_in_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], EventGuest.prototype, "ref_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EventGuest, (ev) => ev.introduced_guests),
    (0, typeorm_1.JoinColumn)({ name: 'ref_id' }),
    __metadata("design:type", EventGuest)
], EventGuest.prototype, "ref", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EventGuest, (ev) => ev.ref),
    __metadata("design:type", Array)
], EventGuest.prototype, "introduced_guests", void 0);
exports.EventGuest = EventGuest = __decorate([
    (0, typeorm_1.Entity)()
], EventGuest);
//# sourceMappingURL=event-guest.entity.js.map