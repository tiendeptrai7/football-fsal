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
exports.FormQuestionDto = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../app/constant/app.enum");
const question_dto_1 = require("../../question/dtos/question.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class FormQuestionDto {
    id;
    question_id;
    form_type;
    question;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, question_id: { required: true, type: () => Number }, form_type: { required: true, enum: require("../../../app/constant/app.enum").EFormType }, question: { required: true, type: () => require("../../question/dtos/question.dto").QuestionDto } };
    }
}
exports.FormQuestionDto = FormQuestionDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FormQuestionDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FormQuestionDto.prototype, "question_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(app_enum_1.EFormType),
    __metadata("design:type", Number)
], FormQuestionDto.prototype, "form_type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => question_dto_1.QuestionDto),
    __metadata("design:type", question_dto_1.QuestionDto)
], FormQuestionDto.prototype, "question", void 0);
//# sourceMappingURL=form-question.dto.js.map