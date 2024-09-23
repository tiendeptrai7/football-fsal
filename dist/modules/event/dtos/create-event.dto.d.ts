import { EStatus } from '@app/constant/app.enum';
import { CreateReminderDto } from '@modules/reminder/dtos/create-reminder.dto';
export declare class CreateEventDto {
    name: string;
    content: string;
    location: string;
    image_url: string;
    started_at: Date;
    ended_at: Date;
    invite_days_before: number;
    invite_expire_days: number;
    invite_send_at: Date;
    invite_expire_at: Date;
    is_public: EStatus;
    status: EStatus;
    reminders: CreateReminderDto[];
}
export declare class CheckInDto {
    qr_code: string;
}
