import { BaseEntity } from '@common/database/entities/base.entity';
import { Role } from '@modules/role/repository/entities/role.entity';
import { Permission } from './permission.entity';
export declare class PermissionRole extends BaseEntity {
    role: Role;
    permission: Permission;
}
