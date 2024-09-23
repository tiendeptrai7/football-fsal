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
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../../app/constant/app.enum");
const base_uuid_entity_1 = require("../../../../common/database/entities/base-uuid.entity");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const profile_entity_1 = require("./profile.entity");
const user_role_entity_1 = require("./user-role.entity");
let User = class User extends base_uuid_entity_1.BaseUUIDEntity {
    email;
    username;
    password;
    status;
    profile;
    user_roles;
    change_password_at;
    login_failed;
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String }, username: { required: true, type: () => String }, status: { required: true, enum: require("../../../../app/constant/app.enum").EStatus }, profile: { required: true, type: () => require("./profile.entity").Profile }, user_roles: { required: true, type: () => [require("./user-role.entity").UserRole] }, change_password_at: { required: true, type: () => Date }, login_failed: { required: true, type: () => Number } };
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ select: false }),
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { default: app_enum_1.EStatus.active }),
    (0, swagger_1.ApiProperty)({ enum: app_enum_1.EStatus }),
    __metadata("design:type", Number)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => profile_entity_1.Profile, (profile) => profile.user, {
        cascade: true,
    }),
    (0, swagger_1.ApiProperty)({ type: () => profile_entity_1.Profile }),
    __metadata("design:type", profile_entity_1.Profile)
], User.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_role_entity_1.UserRole, (ur) => ur.user, {
        cascade: true,
        nullable: true,
    }),
    (0, swagger_1.ApiProperty)({ type: () => user_role_entity_1.UserRole, isArray: true }),
    __metadata("design:type", Array)
], User.prototype, "user_roles", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], User.prototype, "change_password_at", void 0);
__decorate([
    (0, typeorm_1.Column)('smallint', { default: 0 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], User.prototype, "login_failed", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map