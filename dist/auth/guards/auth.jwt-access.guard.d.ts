import { AuthUser } from '@auth/types/auth.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
declare const AuthJwtAccessGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AuthJwtAccessGuard extends AuthJwtAccessGuard_base {
    private readonly reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
    handleRequest<User = AuthUser>(err: Error | CustomError, user: User, info: Error): User;
}
export {};
