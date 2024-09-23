import { AuthService } from '@auth/services/auth.service';
import { AuthUser } from '@auth/types/auth.type';
import { ListPaginate } from '@common/database/types/database.type';
import { RoleRepository } from '@modules/role/repository/repositories/role.repository';
import { SystemService } from '@modules/system/services/system.service';
import { ZaloService } from '@modules/zalo/services/zalo.service';
import { Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { I18nService } from 'nestjs-i18n';
import { CreateUserDto } from '../dtos/create-user.dto';
import { FilterUserDto, FilterZaloUserDto } from '../dtos/filter-user.dto';
import { FollowOADto, ResetLockDto, UpdateProfileDto, UpdateUserDto } from '../dtos/update-user.dto';
import { Profile } from '../repository/entities/profile.entity';
import { User } from '../repository/entities/user.entity';
import { ProfileRepository } from '../repository/repositories/profile.repository';
import { UserRepository } from '../repository/repositories/user.repository';
export declare class UserService {
    private readonly userRepository;
    private readonly roleRepository;
    private readonly profileRepository;
    private readonly systemService;
    private readonly authService;
    private readonly zaloService;
    private readonly logger;
    private readonly cacheManager;
    private readonly userMessage;
    constructor(userRepository: UserRepository, roleRepository: RoleRepository, profileRepository: ProfileRepository, systemService: SystemService, authService: AuthService, zaloService: ZaloService, logger: Logger, cacheManager: Cache, i18nService: I18nService);
    getList(params: FilterUserDto): Promise<ListPaginate<User>>;
    getListZaloUser(params: FilterZaloUserDto): Promise<ListPaginate<Profile>>;
    create(input: CreateUserDto): Promise<void>;
    update(input: UpdateUserDto): Promise<void>;
    toggleStatus(id: string): Promise<void>;
    delete(id: string): Promise<void>;
    getById(id: string): Promise<User>;
    myProfile(loggedUser: AuthUser): Promise<User>;
    followOA(input: FollowOADto, loggedUser: AuthUser): Promise<void>;
    getZaloUserById(id: string): Promise<Profile>;
    updateProfile(input: UpdateProfileDto, loggedUser: AuthUser): Promise<void>;
    resetLock(input: ResetLockDto): Promise<void>;
    private _checkDuplicateInfo;
    private _updateZaloFollowDetails;
}
