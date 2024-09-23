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
exports.Submission = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../../app/constant/app.enum");
const base_entity_1 = require("../../../../common/database/entities/base.entity");
const event_guest_entity_1 = require("../../../event/repository/entities/event-guest.entity");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const form_question_entity_1 = require("./form-question.entity");
const submission_answer_entity_1 = require("./submission-answer.entity");
let Submission = class Submission extends base_entity_1.BaseEntity {
    question_type;
    question_content;
    answer_value;
    answer_text;
    form_question_id;
    form_question;
    event_guest_id;
    event_guest;
    submission_answers;
    static _OPENAPI_METADATA_FACTORY() {
        return { question_type: { required: true, enum: require("../../../../app/constant/app.enum").EQuestionType }, question_content: { required: true, type: () => String }, answer_value: { required: true, type: () => String }, answer_text: { required: true, type: () => String }, form_question_id: { required: true, type: () => Number }, form_question: { required: true, type: () => require("./form-question.entity").FormQuestion }, event_guest_id: { required: true, type: () => Number }, event_guest: { required: true, type: () => require("../../../event/repository/entities/event-guest.entity").EventGuest }, submission_answers: { required: true, type: () => [require("./submission-answer.entity").SubmissionAnswer] } };
    }
};
exports.Submission = Submission;
__decorate([
    (0, typeorm_1.Column)('tinyint'),
    (0, swagger_1.ApiProperty)({ enum: app_enum_1.EQuestionType }),
    __metadata("design:type", Number)
], Submission.prototype, "question_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Submission.prototype, "question_content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Submission.prototype, "answer_value", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Submission.prototype, "answer_text", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Submission.prototype, "form_question_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => form_question_entity_1.FormQuestion, (form) => form.submissions),
    (0, typeorm_1.JoinColumn)({ name: 'form_question_id' }),
    __metadata("design:type", form_question_entity_1.FormQuestion)
], Submission.prototype, "form_question", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Submission.prototype, "event_guest_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_guest_entity_1.EventGuest, (eventGuest) => eventGuest.submissions, {
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'event_guest_id' }),
    __metadata("design:type", event_guest_entity_1.EventGuest)
], Submission.prototype, "event_guest", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => submission_answer_entity_1.SubmissionAnswer, (submission_answer) => submission_answer.submission, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Submission.prototype, "submission_answers", void 0);
exports.Submission = Submission = __decorate([
    (0, typeorm_1.Entity)()
], Submission);
//# sourceMappingURL=submission.entity.js.map