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
exports.PermissionService = void 0;
const custom_error_exception_1 = __importDefault(require("../../../common/error/exceptions/custom-error.exception"));
const common_1 = require("@nestjs/common");
const permission_repository_1 = require("../repository/repositories/permission.repository");
let PermissionService = class PermissionService {
    permissionRepository;
    constructor(permissionRepository) {
        this.permissionRepository = permissionRepository;
    }
    async create(input) {
        await this._checkDuplicateSlug(input?.slug);
        await this.permissionRepository.save(input);
    }
    async getAll() {
        const permissions = await this.permissionRepository.find();
        return this._groupPermission(permissions);
    }
    async getMyPermission(loggedUser) {
        const permissions = await this.permissionRepository.getAllSlugByUserId(loggedUser.id);
        return permissions?.map((p) => p.slug);
    }
    async update(input) {
        const permission = await this._checkDuplicateSlug(input?.slug, input?.id);
        if (!permission) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', 'Permission not found ');
        }
        Object.assign(permission, input);
        await this.permissionRepository.save(permission);
    }
    async delete(id) {
        await this.permissionRepository.delete(id);
    }
    async _checkDuplicateSlug(slug, id) {
        const permission = await this.permissionRepository.findOne({
            where: { slug: slug },
        });
        if (permission) {
            if (!id) {
                throw new custom_error_exception_1.default(400, 'BAD_REQUEST', 'Duplicate code !');
            }
        }
        return permission;
    }
    _groupPermission(permissions) {
        permissions.sort((a, b) => {
            return a.position - b.position;
        });
        const permissionGroupObj = {};
        for (const permission of permissions) {
            const groupName = permission.module;
            if (!permissionGroupObj[groupName]) {
                permissionGroupObj[groupName] = [];
            }
            permissionGroupObj[groupName].push(permission);
        }
        return permissionGroupObj;
    }
};
exports.PermissionService = PermissionService;
exports.PermissionService = PermissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [permission_repository_1.PermissionRepository])
], PermissionService);
//# sourceMappingURL=permission.service.js.map