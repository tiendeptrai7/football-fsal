import { AuthUser } from '@auth/types/auth.type';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { AuthService } from '../services/auth.service';
declare const AuthLocalStrategy_base: new (...args: any[]) => Strategy;
export declare class AuthLocalStrategy extends AuthLocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(req: Request): Promise<AuthUser>;
}
export {};
