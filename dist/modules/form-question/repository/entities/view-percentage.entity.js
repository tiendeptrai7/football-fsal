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
exports.ViewSubmitPercentage = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../../app/constant/app.enum");
const question_entity_1 = require("../../../question/repository/entities/question.entity");
const typeorm_1 = require("typeorm");
const form_question_entity_1 = require("./form-question.entity");
const submission_entity_1 = require("./submission.entity");
let ViewSubmitPercentage = class ViewSubmitPercentage {
    form_id;
    event_guest_id;
    form_type;
    order;
    question_id;
    question_content;
    answer_value;
    static _OPENAPI_METADATA_FACTORY() {
        return { form_id: { required: true, type: () => Number }, event_guest_id: { required: true, type: () => Number }, form_type: { required: true, enum: require("../../../../app/constant/app.enum").EFormType }, order: { required: true, type: () => Number }, question_id: { required: true, type: () => Number }, question_content: { required: true, type: () => String }, answer_value: { required: true, type: () => String } };
    }
};
exports.ViewSubmitPercentage = ViewSubmitPercentage;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ViewSubmitPercentage.prototype, "form_id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ViewSubmitPercentage.prototype, "event_guest_id", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ViewSubmitPercentage.prototype, "form_type", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ViewSubmitPercentage.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ViewSubmitPercentage.prototype, "question_id", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ViewSubmitPercentage.prototype, "question_content", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ViewSubmitPercentage.prototype, "answer_value", void 0);
exports.ViewSubmitPercentage = ViewSubmitPercentage = __decorate([
    (0, typeorm_1.ViewEntity)({
        name: 'view_submit_percentage',
        expression: (dataSource) => dataSource
            .createQueryBuilder()
            .select('submission.event_guest_id', 'event_guest_id')
            .addSelect('form_question.form_id', 'form_id')
            .addSelect('form_question.form_type', 'form_type')
            .addSelect('form_question.order', 'order')
            .addSelect('question.id', 'question_id')
            .addSelect('submission.question_content', 'question_content')
            .addSelect('submission.answer_value', 'answer_value')
            .from(form_question_entity_1.FormQuestion, 'form_question')
            .leftJoin(question_entity_1.Question, 'question', 'question.id = form_question.question_id')
            .leftJoin(submission_entity_1.Submission, 'submission', 'submission.form_question_id = form_question.id')
            .where(`submission.question_type = ${app_enum_1.EQuestionType.percentage}`)
            .andWhere(`submission.id IS NOT NULL`),
    })
], ViewSubmitPercentage);
//# sourceMappingURL=view-percentage.entity.js.map