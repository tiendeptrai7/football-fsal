import { AuthUser } from '@auth/types/auth.type';
import { CreatePermissionDto } from '../dtos/create-permission.dto';
import { UpdatePermissionDto } from '../dtos/update-permission.dto';
import { PermissionRepository } from '../repository/repositories/permission.repository';
import { PermissionList } from '../types/permission.type';
export declare class PermissionService {
    private readonly permissionRepository;
    constructor(permissionRepository: PermissionRepository);
    create(input: CreatePermissionDto): Promise<void>;
    getAll(): Promise<PermissionList>;
    getMyPermission(loggedUser: AuthUser): Promise<string[]>;
    update(input: UpdatePermissionDto): Promise<void>;
    delete(id: number): Promise<void>;
    private _checkDuplicateSlug;
    private _groupPermission;
}
