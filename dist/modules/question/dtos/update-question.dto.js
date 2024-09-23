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
exports.UpdateQuestionDto$ = exports.UpdateQuestionDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_question_dto_1 = require("./create-question.dto");
const update_answer_dto_1 = require("./update-answer.dto");
class UpdateQuestionDto extends create_question_dto_1.CreateQuestionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateQuestionDto = UpdateQuestionDto;
class UpdateQuestionDto$ extends (0, swagger_1.OmitType)((0, swagger_1.PartialType)(create_question_dto_1.CreateQuestionDto), ['answers']) {
    id;
    answers;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, answers: { required: true, type: () => [require("./update-answer.dto").UpdateAnswerDto$] } };
    }
}
exports.UpdateQuestionDto$ = UpdateQuestionDto$;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], UpdateQuestionDto$.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => update_answer_dto_1.UpdateAnswerDto$),
    __metadata("design:type", Array)
], UpdateQuestionDto$.prototype, "answers", void 0);
//# sourceMappingURL=update-question.dto.js.map