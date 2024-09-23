import { AuthUser } from '@auth/types/auth.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthJwtAccessGuard extends AuthGuard('jwt_access') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isAnonymousAllowed = this.reflector.get<boolean>(
      'ANONYMOUS',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if (isAnonymousAllowed && !token) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest<User = AuthUser>(
    err: Error | CustomError,
    user: User,
    info: Error,
  ): User {
    if (err instanceof CustomError) {
      throw err;
    } else if (!user) {
      throw new CustomError(
        HttpStatus.UNAUTHORIZED,
        'UNAUTHORIZED',
        err ? err.message : info?.message,
      );
    }

    return user;
  }
}
