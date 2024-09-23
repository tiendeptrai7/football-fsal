import CustomError from '@common/error/exceptions/custom-error.exception';
import { MessageService } from '@common/message/services/message.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';
@Injectable()
export class AuthScopeGuard implements CanActivate {
  private readonly authMessage: MessageService;
  constructor(
    private readonly reflector: Reflector,
    i18nService: I18nService,
  ) {
    this.authMessage = new MessageService(i18nService, 'auth');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAnonymousAllowed = this.reflector.get<boolean>(
      'ANONYMOUS',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // If anonymous access is allowed and there's no user, allow access
    if (isAnonymousAllowed && !user) {
      return true;
    }

    const requiredFor: string = this.reflector.getAllAndOverride<string>(
      'SCOPE',
      [context.getHandler(), context.getClass()],
    );

    if (requiredFor) {
      const { user } = context.switchToHttp().getRequest();

      if (user.scope !== requiredFor) {
        throw new CustomError(
          403,
          'FORBIDDEN',
          this.authMessage.get('FORBIDDEN'),
        );
      }
    }

    return true;
  }
}
