import { DataSource, Repository } from 'typeorm';
import { FilterRoleDto } from '../../dtos/filter-role.dto';
import { Role } from '../entities/role.entity';
export declare class RoleRepository extends Repository<Role> {
    constructor(dataSource: DataSource);
    getList(params: FilterRoleDto): Promise<[Role[], number]>;
}
