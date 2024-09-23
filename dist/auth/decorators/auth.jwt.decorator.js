"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = Auth;
exports.RefreshGuard = RefreshGuard;
const auth_scope_guard_1 = require("../guards/auth.scope.guard");
const permissions_guard_1 = require("../../modules/permission/guards/permissions.guard");
const common_1 = require("@nestjs/common");
const auth_jwt_access_guard_1 = require("../guards/auth.jwt-access.guard");
const auth_jwt_refresh_guard_1 = require("../guards/auth.jwt-refresh.guard");
function Auth(options) {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)('PERMISSIONS', !options?.permissions
        ? undefined
        : Array.isArray(options?.permissions)
            ? options?.permissions
            : [options?.permissions]), (0, common_1.SetMetadata)('SCOPE', options?.scope ?? 'admin'), (0, common_1.SetMetadata)('ANONYMOUS', options?.anonymous ?? false), (0, common_1.SetMetadata)('ROLES', !options?.roles
        ? undefined
        : Array.isArray(options?.roles)
            ? options?.roles
            : [options?.roles]), (0, common_1.UseGuards)(auth_jwt_access_guard_1.AuthJwtAccessGuard, permissions_guard_1.PermissionsGuard, auth_scope_guard_1.AuthScopeGuard));
}
function RefreshGuard() {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(auth_jwt_refresh_guard_1.AuthJwtRefreshGuard));
}
//# sourceMappingURL=auth.jwt.decorator.js.map