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
exports.ViewSubmitSingleChoice = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../../app/constant/app.enum");
const question_entity_1 = require("../../../question/repository/entities/question.entity");
const typeorm_1 = require("typeorm");
const form_question_entity_1 = require("./form-question.entity");
const submission_entity_1 = require("./submission.entity");
const submission_answer_entity_1 = require("./submission-answer.entity");
let ViewSubmitSingleChoice = class ViewSubmitSingleChoice {
    form_id;
    event_guest_id;
    form_type;
    order;
    question_id;
    question_content;
    answer_id;
    answer_text;
    answer_content;
    static _OPENAPI_METADATA_FACTORY() {
        return { form_id: { required: true, type: () => Number }, event_guest_id: { required: true, type: () => Number }, form_type: { required: true, enum: require("../../../../app/constant/app.enum").EFormType }, order: { required: true, type: () => Number }, question_id: { required: true, type: () => Number }, question_content: { required: true, type: () => String }, answer_id: { required: true, type: () => Number }, answer_text: { required: true, type: () => String }, answer_content: { required: true, type: () => String } };
    }
};
exports.ViewSubmitSingleChoice = ViewSubmitSingleChoice;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ViewSubmitSingleChoice.prototype, "form_id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ViewSubmitSingleChoice.prototype, "event_guest_id", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ViewSubmitSingleChoice.prototype, "form_type", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ViewSubmitSingleChoice.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ViewSubmitSingleChoice.prototype, "question_id", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ViewSubmitSingleChoice.prototype, "question_content", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ViewSubmitSingleChoice.prototype, "answer_id", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ViewSubmitSingleChoice.prototype, "answer_text", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ViewSubmitSingleChoice.prototype, "answer_content", void 0);
exports.ViewSubmitSingleChoice = ViewSubmitSingleChoice = __decorate([
    (0, typeorm_1.ViewEntity)({
        name: 'view_submit_single_choice',
        expression: (dataSource) => dataSource
            .createQueryBuilder()
            .select('submission.event_guest_id', 'event_guest_id')
            .addSelect('form_question.form_id', 'form_id')
            .addSelect('form_question.form_type', 'form_type')
            .addSelect('form_question.order', 'order')
            .addSelect('question.id', 'question_id')
            .addSelect('submission.question_content', 'question_content')
            .addSelect('submission_answer.answer_id', 'answer_id')
            .addSelect('submission_answer.answer_text', 'answer_text')
            .addSelect('submission_answer.answer_content', 'answer_content')
            .from(form_question_entity_1.FormQuestion, 'form_question')
            .leftJoin(question_entity_1.Question, 'question', 'question.id = form_question.question_id')
            .leftJoin(submission_entity_1.Submission, 'submission', 'submission.form_question_id = form_question.id')
            .leftJoin(submission_answer_entity_1.SubmissionAnswer, 'submission_answer', 'submission.id = submission_answer.submission_id')
            .where(`submission.question_type = ${app_enum_1.EQuestionType.single_choice}`)
            .andWhere(`submission.id IS NOT NULL`),
    })
], ViewSubmitSingleChoice);
//# sourceMappingURL=view-single-choice.entity.js.map