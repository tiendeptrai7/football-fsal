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
exports.UpdateFormQuestionDto = exports.UpdateFeedbackFormDto = exports.UpdateFeedbackDocumentDto = exports.UpdateFeedbackDto = void 0;
const openapi = require("@nestjs/swagger");
const update_form_question_dto_1 = require("../../form-question/dtos/update-form-question.dto");
const update_answer_dto_1 = require("../../question/dtos/update-answer.dto");
const update_question_dto_1 = require("../../question/dtos/update-question.dto");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_feedback_dto_1 = require("./create-feedback.dto");
const create_feedback_document_dto_1 = require("./create-feedback-document.dto");
const update_feedback_document_dto_1 = require("./update-feedback-document.dto");
class UpdateFeedbackDto extends (0, swagger_1.OmitType)((0, swagger_1.PartialType)(create_feedback_dto_1.CreateFeedbackDto), ['feedback_documents', 'form_questions']) {
    id;
    feedback_documents;
    form_questions;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, feedback_documents: { required: true, type: () => [require("./update-feedback-document.dto").UpdateFeedbackDocumentDto$] }, form_questions: { required: true, type: () => [require("../../form-question/dtos/update-form-question.dto").UpdateFormQuestionDto$] } };
    }
}
exports.UpdateFeedbackDto = UpdateFeedbackDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateFeedbackDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => update_feedback_document_dto_1.UpdateFeedbackDocumentDto$),
    __metadata("design:type", Array)
], UpdateFeedbackDto.prototype, "feedback_documents", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => update_form_question_dto_1.UpdateFormQuestionDto$),
    __metadata("design:type", Array)
], UpdateFeedbackDto.prototype, "form_questions", void 0);
class UpdateFeedbackDocumentDto extends create_feedback_document_dto_1.CreateFeedbackDocumentDto {
    id;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number } };
    }
}
exports.UpdateFeedbackDocumentDto = UpdateFeedbackDocumentDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateFeedbackDocumentDto.prototype, "id", void 0);
class UpdateFeedbackFormDto {
    feedback;
    feedback_document;
    form_questions;
    static _OPENAPI_METADATA_FACTORY() {
        return { feedback: { required: true, type: () => require("./update-feedback.dto").UpdateFeedbackDto }, feedback_document: { required: false, type: () => [require("./update-feedback.dto").UpdateFeedbackDocumentDto] }, form_questions: { required: false, type: () => [require("./update-feedback.dto").UpdateFormQuestionDto] } };
    }
}
exports.UpdateFeedbackFormDto = UpdateFeedbackFormDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => UpdateFeedbackDto),
    __metadata("design:type", UpdateFeedbackDto)
], UpdateFeedbackFormDto.prototype, "feedback", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => UpdateFeedbackDocumentDto),
    __metadata("design:type", Array)
], UpdateFeedbackFormDto.prototype, "feedback_document", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UpdateFormQuestionDto),
    __metadata("design:type", Array)
], UpdateFeedbackFormDto.prototype, "form_questions", void 0);
class UpdateFormQuestionDto {
    question;
    answer;
    static _OPENAPI_METADATA_FACTORY() {
        return { question: { required: true, type: () => require("../../question/dtos/update-question.dto").UpdateQuestionDto }, answer: { required: false, type: () => [require("../../question/dtos/update-answer.dto").UpdateAnswerDto] } };
    }
}
exports.UpdateFormQuestionDto = UpdateFormQuestionDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => update_question_dto_1.UpdateQuestionDto),
    __metadata("design:type", update_question_dto_1.UpdateQuestionDto)
], UpdateFormQuestionDto.prototype, "question", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => update_answer_dto_1.UpdateAnswerDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateFormQuestionDto.prototype, "answer", void 0);
//# sourceMappingURL=update-feedback.dto.js.map