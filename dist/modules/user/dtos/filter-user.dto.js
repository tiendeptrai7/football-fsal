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
exports.FilterZaloUserDto = exports.FilterUserDto = void 0;
const openapi = require("@nestjs/swagger");
const base_filter_dto_1 = require("../../../common/database/dtos/base-filter.dto");
const class_validator_1 = require("class-validator");
class FilterUserDto extends base_filter_dto_1.BaseFilterParamDto {
    roles;
    static _OPENAPI_METADATA_FACTORY() {
        return { roles: { required: false, type: () => [String] } };
    }
}
exports.FilterUserDto = FilterUserDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], FilterUserDto.prototype, "roles", void 0);
class FilterZaloUserDto extends base_filter_dto_1.BaseFilterParamDto {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.FilterZaloUserDto = FilterZaloUserDto;
//# sourceMappingURL=filter-user.dto.js.map