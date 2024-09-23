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
exports.UpdateEventDto = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../app/constant/app.enum");
const request_utc_to_timezone_decorator_1 = require("../../../common/request/decorators/date/request.utc-to-timezone.decorator");
const request_enum_value_validation_1 = require("../../../common/request/validations/request.enum-value.validation");
const update_reminder_dto_1 = require("../../reminder/dtos/update-reminder.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class UpdateEventDto {
    id;
    name;
    content;
    location;
    image_url;
    started_at;
    ended_at;
    invite_days_before;
    invite_expire_days;
    invite_send_at;
    invite_expire_at;
    is_public;
    status;
    reminders;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: false, type: () => String }, content: { required: false, type: () => String }, location: { required: true, type: () => String }, image_url: { required: false, type: () => String }, started_at: { required: false, type: () => Date }, ended_at: { required: false, type: () => Date }, invite_days_before: { required: false, type: () => Number }, invite_expire_days: { required: false, type: () => Number }, invite_send_at: { required: false, type: () => Date }, invite_expire_at: { required: false, type: () => Date }, is_public: { required: false, enum: require("../../../app/constant/app.enum").EStatus }, status: { required: false, enum: require("../../../app/constant/app.enum").EStatus }, reminders: { required: false, type: () => [require("../../reminder/dtos/update-reminder.dto").UpdateReminderDto] } };
    }
}
exports.UpdateEventDto = UpdateEventDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], UpdateEventDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "image_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    (0, request_utc_to_timezone_decorator_1.StartOf)('minute'),
    __metadata("design:type", Date)
], UpdateEventDto.prototype, "started_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    (0, request_utc_to_timezone_decorator_1.EndOf)('minute'),
    __metadata("design:type", Date)
], UpdateEventDto.prototype, "ended_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(365),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], UpdateEventDto.prototype, "invite_days_before", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(365),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], UpdateEventDto.prototype, "invite_expire_days", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    (0, request_utc_to_timezone_decorator_1.StartOf)('minute'),
    __metadata("design:type", Date)
], UpdateEventDto.prototype, "invite_send_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    (0, request_utc_to_timezone_decorator_1.EndOf)('minute'),
    __metadata("design:type", Date)
], UpdateEventDto.prototype, "invite_expire_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, request_enum_value_validation_1.IsEnumValue)(app_enum_1.EStatus),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], UpdateEventDto.prototype, "is_public", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, request_enum_value_validation_1.IsEnumValue)(app_enum_1.EStatus),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], UpdateEventDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Transform)(({ value }) => (0, class_transformer_1.plainToClass)(update_reminder_dto_1.UpdateReminderDto, value)),
    __metadata("design:type", Array)
], UpdateEventDto.prototype, "reminders", void 0);
//# sourceMappingURL=update-event.dto.js.map