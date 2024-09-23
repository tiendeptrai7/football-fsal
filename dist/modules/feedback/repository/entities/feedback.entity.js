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
exports.Feedback = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../../app/constant/app.enum");
const base_entity_1 = require("../../../../common/database/entities/base.entity");
const event_entity_1 = require("../../../event/repository/entities/event.entity");
const form_question_entity_1 = require("../../../form-question/repository/entities/form-question.entity");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const feedback_document_entity_1 = require("./feedback-document.entity");
let Feedback = class Feedback extends base_entity_1.BaseEntity {
    name;
    code;
    feedback_days_before;
    feedback_expire_days;
    feedback_send_at;
    feedback_expire_at;
    status;
    event_id;
    event;
    feedback_documents;
    form_questions;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, code: { required: true, type: () => String }, feedback_days_before: { required: true, type: () => Number }, feedback_expire_days: { required: true, type: () => Number }, feedback_send_at: { required: true, type: () => Date }, feedback_expire_at: { required: true, type: () => Date }, status: { required: true, enum: require("../../../../app/constant/app.enum").EStatus }, event_id: { required: true, type: () => Number }, event: { required: true, type: () => require("../../../event/repository/entities/event.entity").Event }, feedback_documents: { required: true, type: () => [require("./feedback-document.entity").FeedbackDocument] }, form_questions: { required: true, type: () => [require("../../../form-question/repository/entities/form-question.entity").FormQuestion] } };
    }
};
exports.Feedback = Feedback;
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Feedback.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Feedback.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Feedback.prototype, "feedback_days_before", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Feedback.prototype, "feedback_expire_days", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Feedback.prototype, "feedback_send_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Feedback.prototype, "feedback_expire_at", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { default: app_enum_1.EStatus.active }),
    (0, swagger_1.ApiProperty)({ enum: app_enum_1.EStatus }),
    __metadata("design:type", Number)
], Feedback.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Feedback.prototype, "event_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_entity_1.Event, (event) => event.feedbacks),
    (0, typeorm_1.JoinColumn)({ name: 'event_id' }),
    __metadata("design:type", event_entity_1.Event)
], Feedback.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feedback_document_entity_1.FeedbackDocument, (feedbackDocument) => feedbackDocument.feedback, { cascade: true }),
    __metadata("design:type", Array)
], Feedback.prototype, "feedback_documents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => form_question_entity_1.FormQuestion, (formQuestion) => formQuestion.feedback, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Feedback.prototype, "form_questions", void 0);
exports.Feedback = Feedback = __decorate([
    (0, typeorm_1.Entity)()
], Feedback);
//# sourceMappingURL=feedback.entity.js.map