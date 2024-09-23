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
exports.Role = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../../app/constant/app.enum");
const base_entity_1 = require("../../../../common/database/entities/base.entity");
const permission_role_entity_1 = require("../../../permission/repository/entities/permission-role.entity");
const user_role_entity_1 = require("../../../user/repository/entities/user-role.entity");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let Role = class Role extends base_entity_1.BaseEntity {
    name;
    slug;
    status;
    role_permissions;
    role_users;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, slug: { required: true, type: () => String }, status: { required: true, enum: require("../../../../app/constant/app.enum").EStatus }, role_permissions: { required: true, type: () => [require("../../../permission/repository/entities/permission-role.entity").PermissionRole] }, role_users: { required: true, type: () => [require("../../../user/repository/entities/user-role.entity").UserRole] } };
    }
};
exports.Role = Role;
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Role.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)('smallint', { default: app_enum_1.EStatus.active }),
    (0, swagger_1.ApiProperty)({ enum: app_enum_1.EStatus }),
    __metadata("design:type", Number)
], Role.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => permission_role_entity_1.PermissionRole, (pr) => pr.role, {
        cascade: true,
    }),
    (0, swagger_1.ApiProperty)({ type: () => permission_role_entity_1.PermissionRole, isArray: true }),
    __metadata("design:type", Array)
], Role.prototype, "role_permissions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_role_entity_1.UserRole, (ur) => ur.role),
    (0, swagger_1.ApiProperty)({ type: () => user_role_entity_1.UserRole, isArray: true }),
    __metadata("design:type", Array)
], Role.prototype, "role_users", void 0);
exports.Role = Role = __decorate([
    (0, typeorm_1.Entity)()
], Role);
//# sourceMappingURL=role.entity.js.map