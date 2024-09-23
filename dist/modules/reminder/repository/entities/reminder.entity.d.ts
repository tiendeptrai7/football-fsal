import { BaseEntity } from '@common/database/entities/base.entity';
import { Event } from '@modules/event/repository/entities/event.entity';
import { ReminderHistory } from './reminder-history.entity';
export declare class Reminder extends BaseEntity {
    reminder_days_before: number;
    reminder_expire_days: number;
    reminder_sent_at: Date;
    reminder_expire_at: Date;
    event_id: number;
    event: Event;
    reminder_histories: ReminderHistory[];
}
