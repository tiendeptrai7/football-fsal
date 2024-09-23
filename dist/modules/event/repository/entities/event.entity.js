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
exports.Event = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../../app/constant/app.enum");
const base_entity_1 = require("../../../../common/database/entities/base.entity");
const feedback_entity_1 = require("../../../feedback/repository/entities/feedback.entity");
const reminder_entity_1 = require("../../../reminder/repository/entities/reminder.entity");
const survey_entity_1 = require("../../../survey/repository/entities/survey.entity");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const event_guest_entity_1 = require("./event-guest.entity");
let Event = class Event extends base_entity_1.BaseEntity {
    name;
    code;
    content;
    image_url;
    location;
    started_at;
    ended_at;
    invite_days_before;
    invite_expire_days;
    invite_send_at;
    invite_expire_at;
    is_public;
    publish_at;
    status;
    event_guest;
    reminders;
    feedbacks;
    surveys;
    event_form_id;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, code: { required: true, type: () => String }, content: { required: true, type: () => String }, image_url: { required: true, type: () => String }, location: { required: true, type: () => String }, started_at: { required: true, type: () => Date }, ended_at: { required: true, type: () => Date }, invite_days_before: { required: true, type: () => Number }, invite_expire_days: { required: true, type: () => Number }, invite_send_at: { required: true, type: () => Date }, invite_expire_at: { required: true, type: () => Date }, is_public: { required: true, enum: require("../../../../app/constant/app.enum").EStatus }, publish_at: { required: true, type: () => Date }, status: { required: true, enum: require("../../../../app/constant/app.enum").EStatus }, event_guest: { required: true, type: () => [require("./event-guest.entity").EventGuest] }, reminders: { required: true, type: () => [require("../../../reminder/repository/entities/reminder.entity").Reminder] }, feedbacks: { required: true, type: () => [require("../../../feedback/repository/entities/feedback.entity").Feedback] }, surveys: { required: true, type: () => [require("../../../survey/repository/entities/survey.entity").Survey] }, event_form_id: { required: true, type: () => Number } };
    }
};
exports.Event = Event;
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Event.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Event.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)('ntext'),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Event.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Event.prototype, "image_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 2000, nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Event.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Event.prototype, "started_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Event.prototype, "ended_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Event.prototype, "invite_days_before", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Event.prototype, "invite_expire_days", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Event.prototype, "invite_send_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Event.prototype, "invite_expire_at", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { default: app_enum_1.EStatus.active }),
    (0, swagger_1.ApiProperty)({ enum: app_enum_1.EStatus }),
    __metadata("design:type", Number)
], Event.prototype, "is_public", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Event.prototype, "publish_at", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { default: app_enum_1.EStatus.active }),
    (0, swagger_1.ApiProperty)({ enum: app_enum_1.EStatus }),
    __metadata("design:type", Number)
], Event.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => event_guest_entity_1.EventGuest, (evq) => evq.event),
    __metadata("design:type", Array)
], Event.prototype, "event_guest", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reminder_entity_1.Reminder, (reminder) => reminder.event),
    __metadata("design:type", Array)
], Event.prototype, "reminders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feedback_entity_1.Feedback, (feedback) => feedback.event),
    __metadata("design:type", Array)
], Event.prototype, "feedbacks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => survey_entity_1.Survey, (survey) => survey.event),
    __metadata("design:type", Array)
], Event.prototype, "surveys", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Event.prototype, "event_form_id", void 0);
exports.Event = Event = __decorate([
    (0, typeorm_1.Entity)()
], Event);
//# sourceMappingURL=event.entity.js.map