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
exports.FormQuestion = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../../app/constant/app.enum");
const base_entity_1 = require("../../../../common/database/entities/base.entity");
const feedback_entity_1 = require("../../../feedback/repository/entities/feedback.entity");
const question_entity_1 = require("../../../question/repository/entities/question.entity");
const survey_entity_1 = require("../../../survey/repository/entities/survey.entity");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const submission_entity_1 = require("./submission.entity");
let FormQuestion = class FormQuestion extends base_entity_1.BaseEntity {
    order;
    form_type;
    form_id;
    question_id;
    question;
    submissions;
    feedback;
    survey;
    static _OPENAPI_METADATA_FACTORY() {
        return { order: { required: true, type: () => Number }, form_type: { required: true, enum: require("../../../../app/constant/app.enum").EFormType }, form_id: { required: true, type: () => Number }, question_id: { required: true, type: () => Number }, question: { required: true, type: () => require("../../../question/repository/entities/question.entity").Question }, submissions: { required: true, type: () => [require("./submission.entity").Submission] }, feedback: { required: true, type: () => require("../../../feedback/repository/entities/feedback.entity").Feedback }, survey: { required: true, type: () => require("../../../survey/repository/entities/survey.entity").Survey } };
    }
};
exports.FormQuestion = FormQuestion;
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FormQuestion.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint'),
    (0, swagger_1.ApiProperty)({ enum: app_enum_1.EFormType }),
    __metadata("design:type", Number)
], FormQuestion.prototype, "form_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FormQuestion.prototype, "form_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FormQuestion.prototype, "question_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => question_entity_1.Question, (q) => q.form_questions),
    (0, typeorm_1.JoinColumn)({ name: 'question_id' }),
    __metadata("design:type", question_entity_1.Question)
], FormQuestion.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => submission_entity_1.Submission, (submission) => submission.form_question),
    __metadata("design:type", Array)
], FormQuestion.prototype, "submissions", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => feedback_entity_1.Feedback, (q) => q.form_questions, {
        createForeignKeyConstraints: false,
        orphanedRowAction: 'delete',
    }),
    (0, typeorm_1.JoinColumn)({ referencedColumnName: 'id', name: 'form_id' }),
    __metadata("design:type", feedback_entity_1.Feedback)
], FormQuestion.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => survey_entity_1.Survey, (q) => q.form_questions, {
        createForeignKeyConstraints: false,
        orphanedRowAction: 'delete',
    }),
    (0, typeorm_1.JoinColumn)({ referencedColumnName: 'id', name: 'form_id' }),
    __metadata("design:type", survey_entity_1.Survey)
], FormQuestion.prototype, "survey", void 0);
exports.FormQuestion = FormQuestion = __decorate([
    (0, typeorm_1.Entity)()
], FormQuestion);
//# sourceMappingURL=form-question.entity.js.map