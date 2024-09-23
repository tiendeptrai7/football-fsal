import { EEventStatus, EStatus } from '@app/constant/app.enum';
import { BaseFilterParamDto } from '@common/database/dtos/base-filter.dto';
declare const FilterEventDto_base: import("@nestjs/common").Type<Omit<BaseFilterParamDto, "date_from" | "date_to">>;
export declare class FilterEventDto extends FilterEventDto_base {
    is_public: EStatus;
    event_status: EEventStatus;
    date_from: Date;
    date_to: Date;
}
export declare class FilterEventRelatedHcp {
    hcp_id: number;
}
export {};
