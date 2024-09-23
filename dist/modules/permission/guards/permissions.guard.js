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
exports.PermissionsGuard = void 0;
const custom_error_exception_1 = __importDefault(require("../../../common/error/exceptions/custom-error.exception"));
const message_service_1 = require("../../../common/message/services/message.service");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const nestjs_i18n_1 = require("nestjs-i18n");
const permission_repository_1 = require("../repository/repositories/permission.repository");
let PermissionsGuard = class PermissionsGuard {
    reflector;
    permissionRepository;
    authMessage;
    constructor(reflector, permissionRepository, i18nService) {
        this.reflector = reflector;
        this.permissionRepository = permissionRepository;
        this.authMessage = new message_service_1.MessageService(i18nService, 'auth');
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const { user } = request;
        await this.checkRoles(context, user.roles);
        await this.checkPermissions(context, user.id);
        return true;
    }
    async checkRoles(context, userRoles) {
        const requiredRoles = this.getMetadata('ROLES', context);
        if (requiredRoles?.length && !this.hasRole(userRoles, requiredRoles)) {
            this.throwForbidden();
        }
    }
    async checkPermissions(context, userId) {
        const requiredPermissions = this.getMetadata('PERMISSIONS', context);
        if (requiredPermissions?.length) {
            const userPermissions = await this.permissionRepository.getAllSlugByUserId(userId);
            if (!this.hasPermission(userPermissions.map((p) => p.slug), requiredPermissions)) {
                this.throwForbidden();
            }
        }
    }
    getMetadata(key, context) {
        return this.reflector.getAllAndOverride(key, [
            context.getHandler(),
            context.getClass(),
        ]);
    }
    hasRole(userRoles, requiredRoles) {
        return requiredRoles.some((role) => userRoles.includes(role));
    }
    hasPermission(userPermissions, requiredPermissions) {
        return requiredPermissions.some((permission) => userPermissions.includes(permission));
    }
    throwForbidden() {
        throw new custom_error_exception_1.default(403, 'FORBIDDEN', this.authMessage.get('FORBIDDEN'));
    }
};
exports.PermissionsGuard = PermissionsGuard;
exports.PermissionsGuard = PermissionsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        permission_repository_1.PermissionRepository,
        nestjs_i18n_1.I18nService])
], PermissionsGuard);
//# sourceMappingURL=permissions.guard.js.map