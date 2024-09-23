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
exports.FilterReminderPublicDto = exports.FilterReminderDto = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../app/constant/app.enum");
const base_filter_dto_1 = require("../../../common/database/dtos/base-filter.dto");
const request_enum_value_validation_1 = require("../../../common/request/validations/request.enum-value.validation");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class FilterReminderDto extends base_filter_dto_1.BaseFilterParamDto {
    reminder_sent_at;
    static _OPENAPI_METADATA_FACTORY() {
        return { reminder_sent_at: { required: true, type: () => Date } };
    }
}
exports.FilterReminderDto = FilterReminderDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], FilterReminderDto.prototype, "reminder_sent_at", void 0);
class FilterReminderPublicDto extends base_filter_dto_1.BaseFilterParamDto {
    reply_status;
    static _OPENAPI_METADATA_FACTORY() {
        return { reply_status: { required: false, enum: require("../../../app/constant/app.enum").EStatus } };
    }
}
exports.FilterReminderPublicDto = FilterReminderPublicDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: app_enum_1.EStatus, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, request_enum_value_validation_1.IsEnumValue)(app_enum_1.EStatus),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], FilterReminderPublicDto.prototype, "reply_status", void 0);
//# sourceMappingURL=filter-reminder.dto.js.map