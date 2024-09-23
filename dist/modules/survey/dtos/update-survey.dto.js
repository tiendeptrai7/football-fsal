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
exports.UpdateSurveyFormDto = void 0;
const openapi = require("@nestjs/swagger");
const update_form_question_dto_1 = require("../../form-question/dtos/update-form-question.dto");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_survey_dto_1 = require("./create-survey.dto");
class UpdateSurveyFormDto extends (0, swagger_1.OmitType)((0, swagger_1.PartialType)(create_survey_dto_1.CreateSurveyFormDto), ['form_questions']) {
    id;
    form_questions;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, form_questions: { required: true, type: () => [require("../../form-question/dtos/update-form-question.dto").UpdateFormQuestionDto$] } };
    }
}
exports.UpdateSurveyFormDto = UpdateSurveyFormDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateSurveyFormDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => update_form_question_dto_1.UpdateFormQuestionDto$),
    __metadata("design:type", Array)
], UpdateSurveyFormDto.prototype, "form_questions", void 0);
//# sourceMappingURL=update-survey.dto.js.map