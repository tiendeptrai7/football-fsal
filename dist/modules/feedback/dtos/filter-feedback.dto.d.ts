import { BaseFilterParamDto } from '@common/database/dtos/base-filter.dto';
declare const FilterFeedbackDto_base: import("@nestjs/common").Type<Omit<BaseFilterParamDto, "date_from" | "date_to">>;
export declare class FilterFeedbackDto extends FilterFeedbackDto_base {
    event_id: number;
    date_from: Date;
    date_to: Date;
}
export {};
