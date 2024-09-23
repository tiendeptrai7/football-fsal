import { BaseEntity } from '@common/database/entities/base.entity';
export declare class Token extends BaseEntity {
    user_id: string;
    scope: string;
    access_token: string;
    access_token_expires_at: Date;
    refresh_token: string;
    refresh_token_expires_at: Date;
}
