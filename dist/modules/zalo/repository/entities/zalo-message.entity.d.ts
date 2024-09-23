import { EZaloEventTypes } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { User } from '@modules/user/repository/entities/user.entity';
export declare class ZaloMessage extends BaseEntity {
    from_id: string;
    from_display_name: string;
    from_avatar: string;
    to_id: string;
    to_display_name: string;
    to_avatar: string;
    event_name: EZaloEventTypes;
    message_id: string;
    quote_message_id: string;
    message: string;
    timestamp: number;
    attachments: string;
    comment: string;
    observe_by: string;
    observer: User;
}
