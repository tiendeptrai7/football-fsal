import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
export declare class EmailToken extends BaseEntity {
    user_id: string;
    email: string;
    token: string;
    token_expires_at: Date;
    verified_at: Date;
    status: EStatus;
}
