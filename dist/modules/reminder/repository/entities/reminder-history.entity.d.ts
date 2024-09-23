import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { EventGuest } from '@modules/event/repository/entities/event-guest.entity';
import { Reminder } from './reminder.entity';
export declare class ReminderHistory extends BaseEntity {
    reply_status: EStatus;
    reminder_id: number;
    content: string;
    event_guest_id: number;
    event_guest: EventGuest;
    reminder: Reminder;
}
