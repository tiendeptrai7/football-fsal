import { User } from '@modules/user/repository/entities/user.entity';
import { UserRepository } from '@modules/user/repository/repositories/user.repository';
import { Cache } from 'cache-manager';
import { I18nService } from 'nestjs-i18n';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { AuthUser } from '../types/auth.type';
export declare class AuthPasswordService {
    private readonly userRepository;
    private readonly cacheManager;
    private readonly messageService;
    constructor(userRepository: UserRepository, cacheManager: Cache, i18nService: I18nService);
    passwordAuthenticate(username: string, password: string): Promise<[User, boolean]>;
    resetPassword(userId: string, newPassword: string, current_password?: string): Promise<void>;
    changePassword(input: ChangePasswordDto, loggedUser: AuthUser): Promise<void>;
    private _checkAccountStatus;
    private _checkPassword;
    private _handleIncorrectLogin;
    private _checkRequiredChangePassword;
}
