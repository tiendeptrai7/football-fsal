import { AuthScopeGuard } from '@auth/guards/auth.scope.guard';
import { PermissionsGuard } from '@modules/permission/guards/permissions.guard';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { AuthJwtAccessGuard } from '../guards/auth.jwt-access.guard';
import { AuthJwtRefreshGuard } from '../guards/auth.jwt-refresh.guard';

export function Auth(options?: {
  permissions?: string[] | string;
  scope?: 'admin' | 'mini_app' | 'web';
  anonymous?: boolean;
  roles?: string[] | string;
}): MethodDecorator {
  return applyDecorators(
    SetMetadata(
      'PERMISSIONS',
      !options?.permissions
        ? undefined
        : Array.isArray(options?.permissions)
          ? options?.permissions
          : [options?.permissions],
    ),
    SetMetadata('SCOPE', options?.scope ?? 'admin'),
    SetMetadata('ANONYMOUS', options?.anonymous ?? false),
    SetMetadata(
      'ROLES',
      !options?.roles
        ? undefined
        : Array.isArray(options?.roles)
          ? options?.roles
          : [options?.roles],
    ),
    UseGuards(AuthJwtAccessGuard, PermissionsGuard, AuthScopeGuard),
  );
}

export function RefreshGuard(): MethodDecorator {
  return applyDecorators(UseGuards(AuthJwtRefreshGuard));
}
