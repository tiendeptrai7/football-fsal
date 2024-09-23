import { RoleRepository } from '@modules/role/repository/repositories/role.repository';
import { User } from '@modules/user/repository/entities/user.entity';
import { ProfileRepository } from '@modules/user/repository/repositories/profile.repository';
import { UserRepository } from '@modules/user/repository/repositories/user.repository';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';
import { I18nService } from 'nestjs-i18n';
export declare class AuthZaloService {
    private cacheManager;
    private readonly userRepository;
    private readonly roleRepository;
    private readonly profileRepository;
    private readonly httpService;
    private readonly authMessage;
    constructor(cacheManager: Cache, userRepository: UserRepository, roleRepository: RoleRepository, profileRepository: ProfileRepository, httpService: HttpService, i18nService: I18nService);
    zaloAuthenticate(access_token: string): Promise<User>;
    private _getZaloProfile;
}
