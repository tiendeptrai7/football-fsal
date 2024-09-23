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
exports.SubmissionAnswer = void 0;
const openapi = require("@nestjs/swagger");
const base_date_entity_1 = require("../../../../common/database/entities/base-date.entity");
const answer_entity_1 = require("../../../question/repository/entities/answer.entity");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const submission_entity_1 = require("./submission.entity");
let SubmissionAnswer = class SubmissionAnswer extends base_date_entity_1.BaseDateEntity {
    submission_id;
    answer_id;
    answer_content;
    answer_text;
    submission;
    answer;
    static _OPENAPI_METADATA_FACTORY() {
        return { submission_id: { required: true, type: () => Number }, answer_id: { required: true, type: () => Number }, answer_content: { required: true, type: () => String }, answer_text: { required: true, type: () => String }, submission: { required: true, type: () => require("./submission.entity").Submission }, answer: { required: true, type: () => require("../../../question/repository/entities/answer.entity").Answer } };
    }
};
exports.SubmissionAnswer = SubmissionAnswer;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SubmissionAnswer.prototype, "submission_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SubmissionAnswer.prototype, "answer_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SubmissionAnswer.prototype, "answer_content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SubmissionAnswer.prototype, "answer_text", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => submission_entity_1.Submission, (submission) => submission.submission_answers, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        orphanedRowAction: 'delete',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'submission_id' }),
    __metadata("design:type", submission_entity_1.Submission)
], SubmissionAnswer.prototype, "submission", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => answer_entity_1.Answer, (answer) => answer.submission_answers),
    (0, typeorm_1.JoinColumn)({ name: 'answer_id' }),
    __metadata("design:type", answer_entity_1.Answer)
], SubmissionAnswer.prototype, "answer", void 0);
exports.SubmissionAnswer = SubmissionAnswer = __decorate([
    (0, typeorm_1.Entity)()
], SubmissionAnswer);
//# sourceMappingURL=submission-answer.entity.js.map