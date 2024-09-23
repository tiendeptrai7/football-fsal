import { AuthUser } from '@auth/types/auth.type';
declare const AuthJwtRefreshGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AuthJwtRefreshGuard extends AuthJwtRefreshGuard_base {
    handleRequest<IUser = AuthUser>(err: Error, user: IUser, info: Error): IUser;
}
export {};
