import { EReplyStatus, EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { Submission } from '@modules/form-question/repository/entities/submission.entity';
import { ReminderHistory } from '@modules/reminder/repository/entities/reminder-history.entity';
import { Event } from './event.entity';
export declare class EventGuest extends BaseEntity {
    event_id: number;
    hcp_id: number;
    qr_code: string;
    qr_status: EStatus;
    invitation_time_at: Date;
    reply_status: EReplyStatus;
    is_eligible: EStatus;
    event: Event;
    submissions: Submission[];
    reminders: ReminderHistory[];
    checked_in_at: Date;
    ref_id: number;
    ref: EventGuest;
    introduced_guests: EventGuest[];
}
