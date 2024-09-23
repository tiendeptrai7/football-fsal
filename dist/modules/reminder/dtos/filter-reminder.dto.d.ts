import { EStatus } from '@app/constant/app.enum';
import { BaseFilterParamDto } from '@common/database/dtos/base-filter.dto';
export declare class FilterReminderDto extends BaseFilterParamDto {
    reminder_sent_at: Date;
}
export declare class FilterReminderPublicDto extends BaseFilterParamDto {
    reply_status?: EStatus;
}
