import { FilterZaloUserDto } from '@modules/user/dtos/filter-user.dto';
import { DataSource, Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
export declare class ProfileRepository extends Repository<Profile> {
    constructor(dataSource: DataSource);
    getZaloUserById(id: string): Promise<Profile>;
    getListZaloUser(params: FilterZaloUserDto): Promise<[Profile[], number]>;
}
