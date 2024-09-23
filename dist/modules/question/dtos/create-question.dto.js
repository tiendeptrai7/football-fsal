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
exports.CreateQuestionDto = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../app/constant/app.enum");
const request_enum_value_validation_1 = require("../../../common/request/validations/request.enum-value.validation");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_answer_dto_1 = require("./create-answer.dto");
class CreateQuestionDto {
    type;
    content;
    is_required;
    answers;
    static _OPENAPI_METADATA_FACTORY() {
        return { type: { required: true, enum: require("../../../app/constant/app.enum").EQuestionType }, content: { required: true, type: () => String }, is_required: { required: true, enum: require("../../../app/constant/app.enum").EStatus }, answers: { required: true, type: () => [require("./create-answer.dto").CreateAnswerDto] } };
    }
}
exports.CreateQuestionDto = CreateQuestionDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, request_enum_value_validation_1.IsEnumValue)(app_enum_1.EQuestionType),
    __metadata("design:type", Number)
], CreateQuestionDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(2000),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, request_enum_value_validation_1.IsEnumValue)(app_enum_1.EStatus),
    __metadata("design:type", Number)
], CreateQuestionDto.prototype, "is_required", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_answer_dto_1.CreateAnswerDto),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "answers", void 0);
//# sourceMappingURL=create-question.dto.js.map