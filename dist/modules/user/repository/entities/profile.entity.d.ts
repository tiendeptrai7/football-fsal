import { BaseDateEntity } from '@common/database/entities/base-date.entity';
import { User } from './user.entity';
export declare class Profile extends BaseDateEntity {
    user: User;
    user_id: string;
    phone: string;
    upi: string;
    zalo_id: string;
    zalo_follow_oa_id: string;
    zalo_follow_at: Date;
    full_name: string;
    avatar: string;
    code: string;
}
