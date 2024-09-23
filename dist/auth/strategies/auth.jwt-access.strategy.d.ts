import { AuthPayLoad, AuthUser } from '@auth/types/auth.type';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../services/auth.service';
declare const AuthJwtAccessStrategy_base: new (...args: any[]) => Strategy;
export declare class AuthJwtAccessStrategy extends AuthJwtAccessStrategy_base {
    private readonly authService;
    constructor(configService: ConfigService, authService: AuthService);
    validate(req: Request, payload: AuthPayLoad): Promise<AuthUser>;
}
export {};
