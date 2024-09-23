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
exports.UpdateProfileDto = exports.FollowOADto = exports.ResetLockDto = exports.UpdateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const request_valid_phone_validation_1 = require("../../../common/request/validations/request.valid-phone.validation");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const create_user_dto_1 = require("./create-user.dto");
class UpdateUserDto extends (0, swagger_1.PartialType)(create_user_dto_1.CreateUserDto) {
    id;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String } };
    }
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "id", void 0);
class ResetLockDto {
    id;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String } };
    }
}
exports.ResetLockDto = ResetLockDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ResetLockDto.prototype, "id", void 0);
class FollowOADto {
    zalo_follow_oa_id;
    static _OPENAPI_METADATA_FACTORY() {
        return { zalo_follow_oa_id: { required: true, type: () => String } };
    }
}
exports.FollowOADto = FollowOADto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FollowOADto.prototype, "zalo_follow_oa_id", void 0);
class UpdateProfileDto {
    phone;
    static _OPENAPI_METADATA_FACTORY() {
        return { phone: { required: true, type: () => String } };
    }
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, request_valid_phone_validation_1.IsValidPhone)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "phone", void 0);
//# sourceMappingURL=update-user.dto.js.map