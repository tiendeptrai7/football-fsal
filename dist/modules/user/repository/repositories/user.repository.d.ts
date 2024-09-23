import { EStatus } from '@app/constant/app.enum';
import { DataSource, Repository } from 'typeorm';
import { FilterUserDto } from '../../dtos/filter-user.dto';
import { User } from '../entities/user.entity';
export declare class UserRepository extends Repository<User> {
    constructor(dataSource: DataSource);
    getUserByCredential(credential: string, column: string, withPassword?: boolean, status?: EStatus): Promise<User>;
    getUserWithProfile(criteria: string, column: string): Promise<User>;
    getList(params: FilterUserDto, isExport?: boolean): Promise<[User[], number]>;
    private _applyQueryBase;
}
