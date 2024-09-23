import { AuthUser } from '@auth/types/auth.type';
import { ListPaginate } from '@common/database/types/database.type';
import { CreateUserDto } from '../dtos/create-user.dto';
import { FilterUserDto, FilterZaloUserDto } from '../dtos/filter-user.dto';
import { ResetLockDto, UpdateUserDto } from '../dtos/update-user.dto';
import { Profile } from '../repository/entities/profile.entity';
import { User } from '../repository/entities/user.entity';
import { UserService } from '../services/user.service';
export declare class UserAdminController {
    private readonly service;
    constructor(service: UserService);
    create(body: CreateUserDto): Promise<void>;
    getList(param: FilterUserDto): Promise<ListPaginate<User>>;
    myProfile(user: AuthUser): Promise<User>;
    getListZaloUser(param: FilterZaloUserDto): Promise<ListPaginate<Profile>>;
    getZaloUserById(id: string): Promise<Profile>;
    getById(id: string): Promise<User>;
    update(body: UpdateUserDto): Promise<void>;
    toggleStatus(id: string): Promise<void>;
    resetPassword(body: ResetLockDto): Promise<void>;
    delete(id: string): Promise<void>;
}
