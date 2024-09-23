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
exports.CreateSurveyFormDto = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../app/constant/app.enum");
const request_utc_to_timezone_decorator_1 = require("../../../common/request/decorators/date/request.utc-to-timezone.decorator");
const request_enum_value_validation_1 = require("../../../common/request/validations/request.enum-value.validation");
const create_form_question_dto_1 = require("../../form-question/dtos/create-form-question.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateSurveyFormDto {
    name;
    event_id;
    status;
    started_at;
    ended_at;
    form_questions;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, event_id: { required: true, type: () => Number }, status: { required: true, enum: require("../../../app/constant/app.enum").EStatus }, started_at: { required: true, type: () => Date }, ended_at: { required: true, type: () => Date }, form_questions: { required: true, type: () => [require("../../form-question/dtos/create-form-question.dto").CreateFormQuestionDto] } };
    }
}
exports.CreateSurveyFormDto = CreateSurveyFormDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSurveyFormDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateSurveyFormDto.prototype, "event_id", void 0);
__decorate([
    (0, request_enum_value_validation_1.IsEnumValue)(app_enum_1.EStatus),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateSurveyFormDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsISO8601)(),
    (0, request_utc_to_timezone_decorator_1.UtcToTimezone)(),
    __metadata("design:type", Date)
], CreateSurveyFormDto.prototype, "started_at", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsISO8601)(),
    (0, request_utc_to_timezone_decorator_1.UtcToTimezone)(),
    __metadata("design:type", Date)
], CreateSurveyFormDto.prototype, "ended_at", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_form_question_dto_1.CreateFormQuestionDto),
    __metadata("design:type", Array)
], CreateSurveyFormDto.prototype, "form_questions", void 0);
//# sourceMappingURL=create-survey.dto.js.map