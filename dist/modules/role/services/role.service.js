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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const app_enum_1 = require("../../../app/constant/app.enum");
const custom_error_exception_1 = __importDefault(require("../../../common/error/exceptions/custom-error.exception"));
const message_service_1 = require("../../../common/message/services/message.service");
const object_util_1 = require("../../../common/utils/object.util");
const permission_repository_1 = require("../../permission/repository/repositories/permission.repository");
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const typeorm_1 = require("typeorm");
const role_entity_1 = require("../repository/entities/role.entity");
const role_repository_1 = require("../repository/repositories/role.repository");
let RoleService = class RoleService {
    roleRepository;
    permissionRepository;
    roleMessage;
    permissionMessage;
    constructor(roleRepository, permissionRepository, i18nService) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
        this.roleMessage = new message_service_1.MessageService(i18nService, 'role');
        this.permissionMessage = new message_service_1.MessageService(i18nService, 'permission');
    }
    async getList(params) {
        const [data, count] = await this.roleRepository.getList(params);
        return (0, object_util_1.wrapPagination)(data, count, params);
    }
    async create(input) {
        await this._checkDuplicateSlug(input?.slug);
        const permissions = await this._checkPermissionExist(input?.permission_ids);
        const role = new role_entity_1.Role();
        this._assignValueToRole(role, permissions, input);
        await this.roleRepository.save(role);
    }
    async update(input) {
        const role = await this.roleRepository.findOneBy({ id: input.id });
        if (!role) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.roleMessage.get('NOT_FOUND'));
        }
        await this._checkDuplicateSlug(input?.slug, input?.id);
        const permissions = await this._checkPermissionExist(input?.permission_ids);
        this._assignValueToRole(role, permissions, input);
        await this.roleRepository.save(role);
    }
    async getById(id) {
        const role = await this.roleRepository.findOne({
            where: { id },
            relations: ['role_permissions', 'role_permissions.permission'],
        });
        const permissions = role.role_permissions.map((rp) => rp.permission);
        delete role.role_permissions;
        return {
            ...role,
            permissions: this._groupPermissions(permissions),
        };
    }
    async delete(id) {
        const role = await this.roleRepository.findOne({
            where: { id },
            relations: ['role_users'],
        });
        if (!role) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.roleMessage.get('NOT_FOUND'));
        }
        if (role.role_users.length) {
            throw new custom_error_exception_1.default(400, 'IN_USED', this.roleMessage.get('IN_USED'));
        }
        await this.roleRepository.delete(id);
    }
    async getAll() {
        return this.roleRepository.find({ where: { slug: (0, typeorm_1.Not)('user_standard') } });
    }
    async _checkDuplicateSlug(slug, id) {
        const role = await this.roleRepository.findOne({
            where: { slug: slug },
        });
        if (role) {
            if (!id || role.id !== id) {
                throw new custom_error_exception_1.default(400, 'SLUG_INVALID', this.roleMessage.get('SLUG_INVALID'));
            }
        }
        return role;
    }
    async _checkPermissionExist(permission_ids) {
        const permissions = await this.permissionRepository.findBy({
            id: (0, typeorm_1.In)(permission_ids),
        });
        if (permissions.length !== permission_ids.length) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.permissionMessage.get('NOT_FOUND'));
        }
        return permissions;
    }
    _assignValueToRole(role, permissions, input) {
        Object.assign(role, {
            ...input,
            role_permissions: permissions.map((p) => ({ permission: p })),
        });
    }
    _groupPermissions(input) {
        input.sort((a, b) => {
            return a.position - b.position;
        });
        const permissionGroupObj = {};
        for (const permission of input) {
            const groupName = permission.module;
            if (!permissionGroupObj[groupName]) {
                permissionGroupObj[groupName] = [];
            }
            permissionGroupObj[groupName].push(permission);
        }
        return permissionGroupObj;
    }
    async toggle(id) {
        const role = await this.roleRepository.findOneBy({ id });
        if (!role) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.roleMessage.get('NOT_FOUND'));
        }
        const status = role.status ? app_enum_1.EStatus.inactive : app_enum_1.EStatus.active;
        await this.roleRepository.update({ id }, { status });
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [role_repository_1.RoleRepository,
        permission_repository_1.PermissionRepository,
        nestjs_i18n_1.I18nService])
], RoleService);
//# sourceMappingURL=role.service.js.map