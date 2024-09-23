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
exports.CreateFeedbackDto = exports.FeedbackPublicDto = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../app/constant/app.enum");
const request_utc_to_timezone_decorator_1 = require("../../../common/request/decorators/date/request.utc-to-timezone.decorator");
const request_enum_value_validation_1 = require("../../../common/request/validations/request.enum-value.validation");
const create_form_question_dto_1 = require("../../form-question/dtos/create-form-question.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_feedback_document_dto_1 = require("./create-feedback-document.dto");
class FeedbackPublicDto {
    id;
    code;
    name;
    event_id;
    status;
    started_at;
    ended_at;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, code: { required: true, type: () => String }, name: { required: true, type: () => String }, event_id: { required: true, type: () => Number }, status: { required: true, enum: require("../../../app/constant/app.enum").EStatus }, started_at: { required: true, type: () => Date }, ended_at: { required: true, type: () => Date } };
    }
}
exports.FeedbackPublicDto = FeedbackPublicDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FeedbackPublicDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], FeedbackPublicDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FeedbackPublicDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FeedbackPublicDto.prototype, "event_id", void 0);
__decorate([
    (0, request_enum_value_validation_1.IsEnumValue)(app_enum_1.EStatus),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FeedbackPublicDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsISO8601)(),
    (0, request_utc_to_timezone_decorator_1.UtcToTimezone)(),
    __metadata("design:type", Date)
], FeedbackPublicDto.prototype, "started_at", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsISO8601)(),
    (0, request_utc_to_timezone_decorator_1.UtcToTimezone)(),
    __metadata("design:type", Date)
], FeedbackPublicDto.prototype, "ended_at", void 0);
class CreateFeedbackDto {
    name;
    event_id;
    status;
    feedback_days_before;
    feedback_expire_days;
    feedback_send_at;
    feedback_expire_at;
    feedback_documents;
    form_questions;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, event_id: { required: true, type: () => Number }, status: { required: true, enum: require("../../../app/constant/app.enum").EStatus }, feedback_days_before: { required: true, type: () => Number }, feedback_expire_days: { required: true, type: () => Number }, feedback_send_at: { required: true, type: () => Date }, feedback_expire_at: { required: true, type: () => Date }, feedback_documents: { required: true, type: () => [require("./create-feedback-document.dto").CreateFeedbackDocumentDto] }, form_questions: { required: true, type: () => [require("../../form-question/dtos/create-form-question.dto").CreateFormQuestionDto] } };
    }
}
exports.CreateFeedbackDto = CreateFeedbackDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateFeedbackDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], CreateFeedbackDto.prototype, "event_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, request_enum_value_validation_1.IsEnumValue)(app_enum_1.EStatus),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], CreateFeedbackDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(365),
    __metadata("design:type", Number)
], CreateFeedbackDto.prototype, "feedback_days_before", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(365),
    __metadata("design:type", Number)
], CreateFeedbackDto.prototype, "feedback_expire_days", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsISO8601)(),
    (0, request_utc_to_timezone_decorator_1.StartOf)('minute'),
    __metadata("design:type", Date)
], CreateFeedbackDto.prototype, "feedback_send_at", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsISO8601)(),
    (0, request_utc_to_timezone_decorator_1.EndOf)('minute'),
    __metadata("design:type", Date)
], CreateFeedbackDto.prototype, "feedback_expire_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_feedback_document_dto_1.CreateFeedbackDocumentDto),
    __metadata("design:type", Array)
], CreateFeedbackDto.prototype, "feedback_documents", void 0);
__decorate([
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_form_question_dto_1.CreateFormQuestionDto),
    __metadata("design:type", Array)
], CreateFeedbackDto.prototype, "form_questions", void 0);
//# sourceMappingURL=create-feedback.dto.js.map