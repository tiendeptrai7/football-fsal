import { Request } from 'express';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { ForgotPasswordDto, ResetPasswordDto, VerifyEmailTokenDto } from '../dtos/forgot-password.dto';
import { AuthService } from '../services/auth.service';
import { AuthToken, AuthUser } from '../types/auth.type';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(user: AuthUser): Promise<AuthToken>;
    refresh(user: AuthUser): Promise<AuthToken>;
    revoke(req: Request): Promise<void>;
    forgotPassword(body: ForgotPasswordDto): Promise<void>;
    verifyEmailToken(body: VerifyEmailTokenDto): Promise<void>;
    resetPassword(body: ResetPasswordDto): Promise<void>;
    changePassword(body: ChangePasswordDto, user: AuthUser): Promise<void>;
    checkAccount(body: {
        username: string;
        password: string;
    }): Promise<void>;
}
