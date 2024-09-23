import { EStatus } from '@app/constant/app.enum';
import { BaseUUIDEntity } from '@common/database/entities/base-uuid.entity';
import { Profile } from './profile.entity';
import { UserRole } from './user-role.entity';
export declare class User extends BaseUUIDEntity {
    email: string;
    username: string;
    password: string;
    status: EStatus;
    profile: Profile;
    user_roles: UserRole[];
    change_password_at: Date;
    login_failed: number;
}
