import { BaseEntity } from '@common/database/entities/base.entity';
import { PermissionRole } from './permission-role.entity';
export declare class Permission extends BaseEntity {
    name: string;
    slug: string;
    module: string;
    position: number;
    permission_roles: PermissionRole[];
}
