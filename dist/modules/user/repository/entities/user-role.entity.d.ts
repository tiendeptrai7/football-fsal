import { BaseEntity } from '@common/database/entities/base.entity';
import { Role } from '@modules/role/repository/entities/role.entity';
import { User } from './user.entity';
export declare class UserRole extends BaseEntity {
    user: User;
    role: Role;
}
