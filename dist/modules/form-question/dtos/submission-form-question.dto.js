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
exports.CreateSubmissionDto = exports.SubmissionFormDto = exports.SubmissionAnswerDto = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../app/constant/app.enum");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class SubmissionAnswerDto {
    answer_id;
    answer_text;
    answer_content;
    static _OPENAPI_METADATA_FACTORY() {
        return { answer_id: { required: true, type: () => Number }, answer_text: { required: true, type: () => String }, answer_content: { required: true, type: () => String } };
    }
}
exports.SubmissionAnswerDto = SubmissionAnswerDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SubmissionAnswerDto.prototype, "answer_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SubmissionAnswerDto.prototype, "answer_text", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SubmissionAnswerDto.prototype, "answer_content", void 0);
class SubmissionFormDto {
    question_type;
    question_content;
    form_question_id;
    answer_value;
    answer_text;
    submission_answers;
    static _OPENAPI_METADATA_FACTORY() {
        return { question_type: { required: true, enum: require("../../../app/constant/app.enum").EQuestionType }, question_content: { required: true, type: () => String }, form_question_id: { required: true, type: () => Number }, answer_value: { required: true, type: () => String }, answer_text: { required: true, type: () => String }, submission_answers: { required: true, type: () => [require("./submission-form-question.dto").SubmissionAnswerDto] } };
    }
}
exports.SubmissionFormDto = SubmissionFormDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(app_enum_1.EQuestionType),
    __metadata("design:type", Number)
], SubmissionFormDto.prototype, "question_type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], SubmissionFormDto.prototype, "question_content", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SubmissionFormDto.prototype, "form_question_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], SubmissionFormDto.prototype, "answer_value", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SubmissionFormDto.prototype, "answer_text", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SubmissionAnswerDto),
    __metadata("design:type", Array)
], SubmissionFormDto.prototype, "submission_answers", void 0);
class CreateSubmissionDto {
    form_id;
    submission_form;
    static _OPENAPI_METADATA_FACTORY() {
        return { form_id: { required: true, type: () => Number }, submission_form: { required: true, type: () => [require("./submission-form-question.dto").SubmissionFormDto] } };
    }
}
exports.CreateSubmissionDto = CreateSubmissionDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSubmissionDto.prototype, "form_id", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SubmissionFormDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CreateSubmissionDto.prototype, "submission_form", void 0);
//# sourceMappingURL=submission-form-question.dto.js.map