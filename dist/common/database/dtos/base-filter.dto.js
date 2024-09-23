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
exports.BaseFilterParamDto = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../app/constant/app.enum");
const request_date_range_validation_1 = require("../../request/validations/request.date-range.validation");
const request_enum_value_validation_1 = require("../../request/validations/request.enum-value.validation");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class BaseFilterParamDto {
    filter;
    limit = 10;
    page = 1;
    sorting = 'created_at desc';
    status;
    date_from;
    date_to;
    static _OPENAPI_METADATA_FACTORY() {
        return { filter: { required: false, type: () => String }, limit: { required: true, type: () => Object, default: 10 }, page: { required: true, type: () => Object, default: 1 }, sorting: { required: false, type: () => Object, default: "created_at desc" }, status: { required: false, enum: require("../../../app/constant/app.enum").EStatus }, date_from: { required: false, type: () => Date }, date_to: { required: false, type: () => Date } };
    }
}
exports.BaseFilterParamDto = BaseFilterParamDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseFilterParamDto.prototype, "filter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Object)
], BaseFilterParamDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Object)
], BaseFilterParamDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/(?<column>[a-z]+(_[a-z]+)?)\s(?<dir>(asc|desc))$/),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], BaseFilterParamDto.prototype, "sorting", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: app_enum_1.EStatus, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, request_enum_value_validation_1.IsEnumValue)(app_enum_1.EStatus),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], BaseFilterParamDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    __metadata("design:type", Date)
], BaseFilterParamDto.prototype, "date_from", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    (0, request_date_range_validation_1.CheckDateRange)(30, 'date_from'),
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    __metadata("design:type", Date)
], BaseFilterParamDto.prototype, "date_to", void 0);
//# sourceMappingURL=base-filter.dto.js.map