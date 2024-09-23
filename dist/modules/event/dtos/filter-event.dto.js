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
exports.FilterEventRelatedHcp = exports.FilterEventDto = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../app/constant/app.enum");
const base_filter_dto_1 = require("../../../common/database/dtos/base-filter.dto");
const request_utc_to_timezone_decorator_1 = require("../../../common/request/decorators/date/request.utc-to-timezone.decorator");
const request_enum_value_validation_1 = require("../../../common/request/validations/request.enum-value.validation");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class FilterEventDto extends (0, swagger_1.OmitType)(base_filter_dto_1.BaseFilterParamDto, [
    'date_from',
    'date_to',
]) {
    is_public;
    event_status;
    date_from;
    date_to;
    static _OPENAPI_METADATA_FACTORY() {
        return { is_public: { required: true, enum: require("../../../app/constant/app.enum").EStatus }, event_status: { required: true, enum: require("../../../app/constant/app.enum").EEventStatus }, date_from: { required: true, type: () => Date }, date_to: { required: true, type: () => Date } };
    }
}
exports.FilterEventDto = FilterEventDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, request_enum_value_validation_1.IsEnumValue)(app_enum_1.EStatus),
    (0, swagger_1.ApiProperty)({ enum: app_enum_1.EStatus, required: false }),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], FilterEventDto.prototype, "is_public", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, request_enum_value_validation_1.IsEnumValue)(app_enum_1.EEventStatus),
    (0, swagger_1.ApiProperty)({ enum: app_enum_1.EEventStatus, required: false }),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], FilterEventDto.prototype, "event_status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    (0, request_utc_to_timezone_decorator_1.StartOf)('day'),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], FilterEventDto.prototype, "date_from", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    (0, request_utc_to_timezone_decorator_1.EndOf)('day'),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], FilterEventDto.prototype, "date_to", void 0);
class FilterEventRelatedHcp {
    hcp_id;
    static _OPENAPI_METADATA_FACTORY() {
        return { hcp_id: { required: true, type: () => Number } };
    }
}
exports.FilterEventRelatedHcp = FilterEventRelatedHcp;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], FilterEventRelatedHcp.prototype, "hcp_id", void 0);
//# sourceMappingURL=filter-event.dto.js.map