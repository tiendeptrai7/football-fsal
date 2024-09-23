import CustomError from '@common/error/exceptions/custom-error.exception';
import { MessageService } from '@common/message/services/message.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';

import { PermissionRepository } from '../repository/repositories/permission.repository';

@Injectable()
export class PermissionsGuard implements CanActivate {
  private readonly authMessage: MessageService;

  constructor(
    private readonly reflector: Reflector,
    private readonly permissionRepository: PermissionRepository,
    i18nService: I18nService,
  ) {
    this.authMessage = new MessageService(i18nService, 'auth');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    await this.checkRoles(context, user.roles);
    await this.checkPermissions(context, user.id);

    return true;
  }

  private async checkRoles(
    context: ExecutionContext,
    userRoles: string[],
  ): Promise<void> {
    const requiredRoles = this.getMetadata<string[]>('ROLES', context);
    if (requiredRoles?.length && !this.hasRole(userRoles, requiredRoles)) {
      this.throwForbidden();
    }
  }

  private async checkPermissions(
    context: ExecutionContext,
    userId: string,
  ): Promise<void> {
    const requiredPermissions = this.getMetadata<string[]>(
      'PERMISSIONS',
      context,
    );
    if (requiredPermissions?.length) {
      const userPermissions =
        await this.permissionRepository.getAllSlugByUserId(userId);
      if (
        !this.hasPermission(
          userPermissions.map((p) => p.slug),
          requiredPermissions,
        )
      ) {
        this.throwForbidden();
      }
    }
  }

  private getMetadata<T>(
    key: string,
    context: ExecutionContext,
  ): T | undefined {
    return this.reflector.getAllAndOverride<T>(key, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private hasRole(userRoles: string[], requiredRoles: string[]): boolean {
    return requiredRoles.some((role) => userRoles.includes(role));
  }

  private hasPermission(
    userPermissions: string[],
    requiredPermissions: string[],
  ): boolean {
    return requiredPermissions.some((permission) =>
      userPermissions.includes(permission),
    );
  }

  private throwForbidden(): void {
    throw new CustomError(403, 'FORBIDDEN', this.authMessage.get('FORBIDDEN'));
  }
}
