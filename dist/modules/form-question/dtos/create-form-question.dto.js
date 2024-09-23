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
exports.UpdateFormQuestionDto = exports.CreateFormQuestionDto = exports.FormOptionDto = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../app/constant/app.enum");
const create_question_dto_1 = require("../../question/dtos/create-question.dto");
const update_question_dto_1 = require("../../question/dtos/update-question.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class FormOptionDto {
    form_type;
    form_id;
    static _OPENAPI_METADATA_FACTORY() {
        return { form_type: { required: true, enum: require("../../../app/constant/app.enum").EFormType }, form_id: { required: true, type: () => Number } };
    }
}
exports.FormOptionDto = FormOptionDto;
__decorate([
    (0, class_validator_1.IsEnum)(app_enum_1.EFormType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FormOptionDto.prototype, "form_type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FormOptionDto.prototype, "form_id", void 0);
class CreateFormQuestionDto {
    question;
    static _OPENAPI_METADATA_FACTORY() {
        return { question: { required: true, type: () => require("../../question/dtos/create-question.dto").CreateQuestionDto } };
    }
}
exports.CreateFormQuestionDto = CreateFormQuestionDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => create_question_dto_1.CreateQuestionDto),
    __metadata("design:type", create_question_dto_1.CreateQuestionDto)
], CreateFormQuestionDto.prototype, "question", void 0);
class UpdateFormQuestionDto {
    question;
    static _OPENAPI_METADATA_FACTORY() {
        return { question: { required: true, type: () => require("../../question/dtos/update-question.dto").UpdateQuestionDto } };
    }
}
exports.UpdateFormQuestionDto = UpdateFormQuestionDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => update_question_dto_1.UpdateQuestionDto),
    __metadata("design:type", update_question_dto_1.UpdateQuestionDto)
], UpdateFormQuestionDto.prototype, "question", void 0);
//# sourceMappingURL=create-form-question.dto.js.map