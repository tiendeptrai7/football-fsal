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
exports.UpdateFormQuestionDto$ = void 0;
const openapi = require("@nestjs/swagger");
const update_question_dto_1 = require("../../question/dtos/update-question.dto");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_form_question_dto_1 = require("./create-form-question.dto");
class UpdateFormQuestionDto$ extends (0, swagger_1.OmitType)((0, swagger_1.PartialType)(create_form_question_dto_1.CreateFormQuestionDto), ['question']) {
    id;
    question;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, question: { required: true, type: () => require("../../question/dtos/update-question.dto").UpdateQuestionDto$ } };
    }
}
exports.UpdateFormQuestionDto$ = UpdateFormQuestionDto$;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], UpdateFormQuestionDto$.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => update_question_dto_1.UpdateQuestionDto$),
    __metadata("design:type", update_question_dto_1.UpdateQuestionDto$)
], UpdateFormQuestionDto$.prototype, "question", void 0);
//# sourceMappingURL=update-form-question.dto.js.map