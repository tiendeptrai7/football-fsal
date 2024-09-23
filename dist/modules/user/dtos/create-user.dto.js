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
exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const app_constant_1 = require("../../../app/constant/app.constant");
const app_enum_1 = require("../../../app/constant/app.enum");
const request_enum_value_validation_1 = require("../../../common/request/validations/request.enum-value.validation");
const request_valid_phone_validation_1 = require("../../../common/request/validations/request.valid-phone.validation");
const string_util_1 = require("../../../common/utils/string.util");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ProfileDto {
    full_name;
    phone;
    upi;
    static _OPENAPI_METADATA_FACTORY() {
        return { full_name: { required: true, type: () => String }, phone: { required: true, type: () => String }, upi: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], ProfileDto.prototype, "full_name", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (0, string_util_1.normalizePhone)(value)),
    (0, class_validator_1.IsOptional)(),
    (0, request_valid_phone_validation_1.IsValidPhone)(),
    __metadata("design:type", String)
], ProfileDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], ProfileDto.prototype, "upi", void 0);
class CreateUserDto {
    username;
    email;
    status;
    role_ids;
    profile;
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String }, email: { required: true, type: () => String }, status: { required: true, enum: require("../../../app/constant/app.enum").EStatus }, role_ids: { required: true, type: () => [Number] }, profile: { required: true, type: () => ProfileDto } };
    }
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    (0, class_validator_1.Matches)(app_constant_1.USER_NAME_REGEX),
    (0, class_transformer_1.Transform)(({ value }) => value?.toString()?.trim()?.toLowerCase()),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, request_enum_value_validation_1.IsEnumValue)(app_enum_1.EStatus),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ each: true }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "role_ids", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => ProfileDto),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", ProfileDto)
], CreateUserDto.prototype, "profile", void 0);
//# sourceMappingURL=create-user.dto.js.map