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
exports.FilterSurveyDto = void 0;
const openapi = require("@nestjs/swagger");
const base_filter_dto_1 = require("../../../common/database/dtos/base-filter.dto");
const request_utc_to_timezone_decorator_1 = require("../../../common/request/decorators/date/request.utc-to-timezone.decorator");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FilterSurveyDto extends (0, swagger_1.OmitType)(base_filter_dto_1.BaseFilterParamDto, [
    'date_from',
    'date_to',
]) {
    date_from;
    date_to;
    static _OPENAPI_METADATA_FACTORY() {
        return { date_from: { required: true, type: () => Date }, date_to: { required: true, type: () => Date } };
    }
}
exports.FilterSurveyDto = FilterSurveyDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    (0, request_utc_to_timezone_decorator_1.StartOf)('day'),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], FilterSurveyDto.prototype, "date_from", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    (0, request_utc_to_timezone_decorator_1.EndOf)('day'),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], FilterSurveyDto.prototype, "date_to", void 0);
//# sourceMappingURL=filter-survey.dto.js.map