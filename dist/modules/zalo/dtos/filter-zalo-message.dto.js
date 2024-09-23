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
exports.FilterZaloMessageDto = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../app/constant/app.enum");
const base_filter_dto_1 = require("../../../common/database/dtos/base-filter.dto");
const request_utc_to_timezone_decorator_1 = require("../../../common/request/decorators/date/request.utc-to-timezone.decorator");
const request_enum_value_validation_1 = require("../../../common/request/validations/request.enum-value.validation");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class FilterZaloMessageDto extends (0, swagger_1.OmitType)(base_filter_dto_1.BaseFilterParamDto, [
    'date_from',
    'date_to',
]) {
    activities;
    observe_by;
    message_type;
    date_from;
    date_to;
    static _OPENAPI_METADATA_FACTORY() {
        return { activities: { required: true, enum: require("../../../app/constant/app.enum").EStatus }, observe_by: { required: true, type: () => String }, message_type: { required: true, type: () => String }, date_from: { required: true, type: () => Date }, date_to: { required: true, type: () => Date } };
    }
}
exports.FilterZaloMessageDto = FilterZaloMessageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: app_enum_1.EStatus, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, request_enum_value_validation_1.IsEnumValue)(app_enum_1.EStatus),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], FilterZaloMessageDto.prototype, "activities", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterZaloMessageDto.prototype, "observe_by", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterZaloMessageDto.prototype, "message_type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    (0, request_utc_to_timezone_decorator_1.StartOf)('day'),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], FilterZaloMessageDto.prototype, "date_from", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    (0, request_utc_to_timezone_decorator_1.EndOf)('day'),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], FilterZaloMessageDto.prototype, "date_to", void 0);
//# sourceMappingURL=filter-zalo-message.dto.js.map