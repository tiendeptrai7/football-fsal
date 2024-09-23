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
exports.EventRegistrationOptionDto = exports.EventRegistrationInfoDto = exports.SubmitAccompanyingGuestDto = exports.EventFormOptionDto = exports.EventFormDetailDto = exports.CreateEventFormDto = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../app/constant/app.enum");
const request_enum_value_validation_1 = require("../../../common/request/validations/request.enum-value.validation");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateEventFormDto {
    name;
    consent;
    status;
    event_form_details;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, consent: { required: true, type: () => String }, status: { required: true, enum: require("../../../app/constant/app.enum").EStatus }, event_form_details: { required: true, type: () => [require("./create-event-form.dto").EventFormDetailDto] } };
    }
}
exports.CreateEventFormDto = CreateEventFormDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateEventFormDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(2000),
    __metadata("design:type", String)
], CreateEventFormDto.prototype, "consent", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, request_enum_value_validation_1.IsEnumValue)(app_enum_1.EStatus),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], CreateEventFormDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => EventFormDetailDto),
    __metadata("design:type", Array)
], CreateEventFormDto.prototype, "event_form_details", void 0);
class EventFormDetailDto {
    id;
    content;
    type;
    format;
    is_required;
    event_form_options;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, content: { required: true, type: () => String }, type: { required: true, enum: require("../../../app/constant/app.enum").EEventFormDetailType }, format: { required: true, enum: require("../../../app/constant/app.enum").EEventFormDetailFormat }, is_required: { required: true, enum: require("../../../app/constant/app.enum").EStatus }, event_form_options: { required: true, type: () => [require("./create-event-form.dto").EventFormOptionDto] } };
    }
}
exports.EventFormDetailDto = EventFormDetailDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value) || null),
    __metadata("design:type", Number)
], EventFormDetailDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(2000),
    __metadata("design:type", String)
], EventFormDetailDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, request_enum_value_validation_1.IsEnumValue)(app_enum_1.EEventFormDetailType),
    __metadata("design:type", String)
], EventFormDetailDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, request_enum_value_validation_1.IsEnumValue)(app_enum_1.EEventFormDetailFormat),
    __metadata("design:type", String)
], EventFormDetailDto.prototype, "format", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, request_enum_value_validation_1.IsEnumValue)(app_enum_1.EStatus),
    __metadata("design:type", Number)
], EventFormDetailDto.prototype, "is_required", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => EventFormOptionDto),
    __metadata("design:type", Array)
], EventFormDetailDto.prototype, "event_form_options", void 0);
class EventFormOptionDto {
    id;
    content;
    require_input;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, content: { required: true, type: () => String }, require_input: { required: true, enum: require("../../../app/constant/app.enum").EStatus } };
    }
}
exports.EventFormOptionDto = EventFormOptionDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value) || null),
    __metadata("design:type", Number)
], EventFormOptionDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], EventFormOptionDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, request_enum_value_validation_1.IsEnumValue)(app_enum_1.EStatus),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], EventFormOptionDto.prototype, "require_input", void 0);
class SubmitAccompanyingGuestDto {
    event_guest_id;
    event_registration_info;
    static _OPENAPI_METADATA_FACTORY() {
        return { event_guest_id: { required: true, type: () => Number }, event_registration_info: { required: true, type: () => [require("./create-event-form.dto").EventRegistrationInfoDto] } };
    }
}
exports.SubmitAccompanyingGuestDto = SubmitAccompanyingGuestDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SubmitAccompanyingGuestDto.prototype, "event_guest_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => EventRegistrationInfoDto),
    __metadata("design:type", Array)
], SubmitAccompanyingGuestDto.prototype, "event_registration_info", void 0);
class EventRegistrationInfoDto {
    event_form_detail_id;
    value;
    content;
    event_registration_option;
    static _OPENAPI_METADATA_FACTORY() {
        return { event_form_detail_id: { required: true, type: () => Number }, value: { required: true, type: () => String }, content: { required: true, type: () => String }, event_registration_option: { required: true, type: () => [require("./create-event-form.dto").EventRegistrationOptionDto] } };
    }
}
exports.EventRegistrationInfoDto = EventRegistrationInfoDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EventRegistrationInfoDto.prototype, "event_form_detail_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!isNaN(value))
            return '' + value;
        return value;
    }),
    __metadata("design:type", String)
], EventRegistrationInfoDto.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EventRegistrationInfoDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => EventRegistrationOptionDto),
    __metadata("design:type", Array)
], EventRegistrationInfoDto.prototype, "event_registration_option", void 0);
class EventRegistrationOptionDto {
    event_form_option_id;
    value;
    content;
    static _OPENAPI_METADATA_FACTORY() {
        return { event_form_option_id: { required: true, type: () => Number }, value: { required: true, type: () => String }, content: { required: true, type: () => String } };
    }
}
exports.EventRegistrationOptionDto = EventRegistrationOptionDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EventRegistrationOptionDto.prototype, "event_form_option_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!isNaN(value))
            return '' + value;
        return value;
    }),
    __metadata("design:type", String)
], EventRegistrationOptionDto.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EventRegistrationOptionDto.prototype, "content", void 0);
//# sourceMappingURL=create-event-form.dto.js.map