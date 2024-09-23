import { ECheckInStatus, EHCPType } from '@app/constant/app.enum';
import { BaseFilterParamDto } from '@common/database/dtos/base-filter.dto';
export declare class FilterEventGuestDto extends BaseFilterParamDto {
    event_id: number;
    med_rep_code: string;
    type: EHCPType;
    check_in_status: ECheckInStatus;
}
