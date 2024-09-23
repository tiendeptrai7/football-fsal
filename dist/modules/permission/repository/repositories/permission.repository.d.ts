import { DataSource, Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
export declare class PermissionRepository extends Repository<Permission> {
    private dataSource;
    constructor(dataSource: DataSource);
    getAllSlugByUserId(userId: string): Promise<Permission[]>;
    getPermissionByRole(roleId: number): Promise<Permission[]>;
}
