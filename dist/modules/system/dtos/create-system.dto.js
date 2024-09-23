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
exports.CreateSystemDto = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../app/constant/app.enum");
const request_enum_value_validation_1 = require("../../../common/request/validations/request.enum-value.validation");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateSystemDto {
    name;
    key;
    value;
    unit;
    group;
    is_public = app_enum_1.EStatus.active;
    status = app_enum_1.EStatus.active;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, key: { required: true, type: () => String }, value: { required: true, type: () => String }, unit: { required: true, enum: require("../../../app/constant/app.enum").ESystemType }, group: { required: true, type: () => String }, is_public: { required: true, type: () => Object, default: app_enum_1.EStatus.active, enum: require("../../../app/constant/app.enum").EStatus }, status: { required: true, type: () => Object, default: app_enum_1.EStatus.active, enum: require("../../../app/constant/app.enum").EStatus } };
    }
}
exports.CreateSystemDto = CreateSystemDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_transformer_1.Transform)(({ value }) => value?.toString()?.trim()),
    __metadata("design:type", String)
], CreateSystemDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_transformer_1.Transform)(({ value }) => value?.toString()?.trim()),
    __metadata("design:type", String)
], CreateSystemDto.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSystemDto.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, request_enum_value_validation_1.IsEnumValue)(app_enum_1.ESystemType),
    __metadata("design:type", Number)
], CreateSystemDto.prototype, "unit", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSystemDto.prototype, "group", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, request_enum_value_validation_1.IsEnumValue)(app_enum_1.EStatus),
    __metadata("design:type", Object)
], CreateSystemDto.prototype, "is_public", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, request_enum_value_validation_1.IsEnumValue)(app_enum_1.EStatus),
    __metadata("design:type", Object)
], CreateSystemDto.prototype, "status", void 0);
//# sourceMappingURL=create-system.dto.js.map