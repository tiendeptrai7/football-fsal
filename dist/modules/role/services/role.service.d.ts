import { ListPaginate } from '@common/database/types/database.type';
import { PermissionRepository } from '@modules/permission/repository/repositories/permission.repository';
import { I18nService } from 'nestjs-i18n';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { FilterRoleDto } from '../dtos/filter-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';
import { Role } from '../repository/entities/role.entity';
import { RoleRepository } from '../repository/repositories/role.repository';
import { RolePermission } from '../types/role.type';
export declare class RoleService {
    private readonly roleRepository;
    private readonly permissionRepository;
    private roleMessage;
    private permissionMessage;
    constructor(roleRepository: RoleRepository, permissionRepository: PermissionRepository, i18nService: I18nService);
    getList(params: FilterRoleDto): Promise<ListPaginate<Role>>;
    create(input: CreateRoleDto): Promise<void>;
    update(input: UpdateRoleDto): Promise<void>;
    getById(id: number): Promise<RolePermission>;
    delete(id: number): Promise<void>;
    getAll(): Promise<Role[]>;
    private _checkDuplicateSlug;
    private _checkPermissionExist;
    private _assignValueToRole;
    private _groupPermissions;
    toggle(id: number): Promise<void>;
}
