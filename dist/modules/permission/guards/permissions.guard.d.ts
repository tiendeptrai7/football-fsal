import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';
import { PermissionRepository } from '../repository/repositories/permission.repository';
export declare class PermissionsGuard implements CanActivate {
    private readonly reflector;
    private readonly permissionRepository;
    private readonly authMessage;
    constructor(reflector: Reflector, permissionRepository: PermissionRepository, i18nService: I18nService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private checkRoles;
    private checkPermissions;
    private getMetadata;
    private hasRole;
    private hasPermission;
    private throwForbidden;
}
