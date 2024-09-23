import { AuthUser } from '@auth/types/auth.type';
import { CreatePermissionDto } from '../dtos/create-permission.dto';
import { UpdatePermissionDto } from '../dtos/update-permission.dto';
import { PermissionService } from '../services/permission.service';
import { PermissionList } from '../types/permission.type';
export declare class PermissionAdminController {
    private readonly service;
    constructor(service: PermissionService);
    create(body: CreatePermissionDto): Promise<void>;
    getAll(): Promise<PermissionList>;
    getMyPermission(user: AuthUser): Promise<string[]>;
    update(body: UpdatePermissionDto): Promise<void>;
    delete(id: number): Promise<void>;
}
