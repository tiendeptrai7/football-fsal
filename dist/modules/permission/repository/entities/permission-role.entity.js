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
exports.PermissionRole = void 0;
const openapi = require("@nestjs/swagger");
const base_entity_1 = require("../../../../common/database/entities/base.entity");
const role_entity_1 = require("../../../role/repository/entities/role.entity");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const permission_entity_1 = require("./permission.entity");
let PermissionRole = class PermissionRole extends base_entity_1.BaseEntity {
    role;
    permission;
    static _OPENAPI_METADATA_FACTORY() {
        return { role: { required: true, type: () => require("../../../role/repository/entities/role.entity").Role }, permission: { required: true, type: () => require("./permission.entity").Permission } };
    }
};
exports.PermissionRole = PermissionRole;
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.Role, (role) => role.role_permissions, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        orphanedRowAction: 'delete',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'role_id' }),
    (0, swagger_1.ApiProperty)({ type: () => role_entity_1.Role }),
    __metadata("design:type", role_entity_1.Role)
], PermissionRole.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => permission_entity_1.Permission, (permission) => permission.permission_roles, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        orphanedRowAction: 'delete',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'permission_id' }),
    (0, swagger_1.ApiProperty)({ type: () => permission_entity_1.Permission }),
    __metadata("design:type", permission_entity_1.Permission)
], PermissionRole.prototype, "permission", void 0);
exports.PermissionRole = PermissionRole = __decorate([
    (0, typeorm_1.Entity)()
], PermissionRole);
//# sourceMappingURL=permission-role.entity.js.map