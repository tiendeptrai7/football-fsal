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
exports.CheckInDto = exports.CreateEventDto = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../app/constant/app.enum");
const request_utc_to_timezone_decorator_1 = require("../../../common/request/decorators/date/request.utc-to-timezone.decorator");
const request_enum_value_validation_1 = require("../../../common/request/validations/request.enum-value.validation");
const create_reminder_dto_1 = require("../../reminder/dtos/create-reminder.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateEventDto {
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
        return { name: { required: true, type: () => String }, content: { required: true, type: () => String }, location: { required: true, type: () => String }, image_url: { required: true, type: () => String }, started_at: { required: true, type: () => Date }, ended_at: { required: true, type: () => Date }, invite_days_before: { required: true, type: () => Number }, invite_expire_days: { required: true, type: () => Number }, invite_send_at: { required: true, type: () => Date }, invite_expire_at: { required: true, type: () => Date }, is_public: { required: true, enum: require("../../../app/constant/app.enum").EStatus }, status: { required: true, enum: require("../../../app/constant/app.enum").EStatus }, reminders: { required: true, type: () => [require("../../reminder/dtos/create-reminder.dto").CreateReminderDto] } };
    }
}
exports.CreateEventDto = CreateEventDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateEventDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "image_url", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsISO8601)(),
    (0, request_utc_to_timezone_decorator_1.StartOf)('minute'),
    __metadata("design:type", Date)
], CreateEventDto.prototype, "started_at", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsISO8601)(),
    (0, request_utc_to_timezone_decorator_1.EndOf)('minute'),
    __metadata("design:type", Date)
], CreateEventDto.prototype, "ended_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(365),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], CreateEventDto.prototype, "invite_days_before", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(365),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], CreateEventDto.prototype, "invite_expire_days", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsISO8601)(),
    (0, request_utc_to_timezone_decorator_1.StartOf)('minute'),
    __metadata("design:type", Date)
], CreateEventDto.prototype, "invite_send_at", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsISO8601)(),
    (0, request_utc_to_timezone_decorator_1.EndOf)('minute'),
    __metadata("design:type", Date)
], CreateEventDto.prototype, "invite_expire_at", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, request_enum_value_validation_1.IsEnumValue)(app_enum_1.EStatus),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], CreateEventDto.prototype, "is_public", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, request_enum_value_validation_1.IsEnumValue)(app_enum_1.EStatus),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], CreateEventDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Transform)(({ value }) => (0, class_transformer_1.plainToClass)(create_reminder_dto_1.CreateReminderDto, value)),
    __metadata("design:type", Array)
], CreateEventDto.prototype, "reminders", void 0);
class CheckInDto {
    qr_code;
    static _OPENAPI_METADATA_FACTORY() {
        return { qr_code: { required: true, type: () => String } };
    }
}
exports.CheckInDto = CheckInDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CheckInDto.prototype, "qr_code", void 0);
//# sourceMappingURL=create-event.dto.js.map