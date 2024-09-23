import { ListPaginate } from '@common/database/types/database.type';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { FilterRoleDto } from '../dtos/filter-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';
import { Role } from '../repository/entities/role.entity';
import { RoleService } from '../services/role.service';
import { RolePermission } from '../types/role.type';
export declare class RoleAdminController {
    private readonly service;
    constructor(service: RoleService);
    create(body: CreateRoleDto): Promise<void>;
    getById(id: number): Promise<RolePermission>;
    getList(param: FilterRoleDto): Promise<ListPaginate<Role>>;
    getAll(): Promise<Role[]>;
    update(body: UpdateRoleDto): Promise<void>;
    delete(id: number): Promise<void>;
    toggle(id: number): Promise<void>;
}
