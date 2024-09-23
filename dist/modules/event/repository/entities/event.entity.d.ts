import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { Feedback } from '@modules/feedback/repository/entities/feedback.entity';
import { Reminder } from '@modules/reminder/repository/entities/reminder.entity';
import { Survey } from '@modules/survey/repository/entities/survey.entity';
import { EventGuest } from './event-guest.entity';
export declare class Event extends BaseEntity {
    name: string;
    code: string;
    content: string;
    image_url: string;
    location: string;
    started_at: Date;
    ended_at: Date;
    invite_days_before: number;
    invite_expire_days: number;
    invite_send_at: Date;
    invite_expire_at: Date;
    is_public: EStatus;
    publish_at: Date;
    status: EStatus;
    event_guest: EventGuest[];
    reminders: Reminder[];
    feedbacks: Feedback[];
    surveys: Survey[];
    event_form_id: number;
}
