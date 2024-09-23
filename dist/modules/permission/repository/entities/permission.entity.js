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
exports.Permission = void 0;
const openapi = require("@nestjs/swagger");
const base_entity_1 = require("../../../../common/database/entities/base.entity");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const permission_role_entity_1 = require("./permission-role.entity");
let Permission = class Permission extends base_entity_1.BaseEntity {
    name;
    slug;
    module;
    position;
    permission_roles;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, slug: { required: true, type: () => String }, module: { required: true, type: () => String }, position: { required: true, type: () => Number }, permission_roles: { required: true, type: () => [require("./permission-role.entity").PermissionRole] } };
    }
};
exports.Permission = Permission;
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Permission.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Permission.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Permission.prototype, "module", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Permission.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => permission_role_entity_1.PermissionRole, (pr) => pr.permission, { cascade: true }),
    (0, swagger_1.ApiProperty)({ type: () => permission_role_entity_1.PermissionRole }),
    __metadata("design:type", Array)
], Permission.prototype, "permission_roles", void 0);
exports.Permission = Permission = __decorate([
    (0, typeorm_1.Entity)()
], Permission);
//# sourceMappingURL=permission.entity.js.map