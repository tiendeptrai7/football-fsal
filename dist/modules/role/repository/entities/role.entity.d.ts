import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { PermissionRole } from '@modules/permission/repository/entities/permission-role.entity';
import { UserRole } from '@modules/user/repository/entities/user-role.entity';
export declare class Role extends BaseEntity {
    name: string;
    slug: string;
    status: EStatus;
    role_permissions: PermissionRole[];
    role_users: UserRole[];
}
