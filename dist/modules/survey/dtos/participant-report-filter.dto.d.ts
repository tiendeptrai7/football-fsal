import { BaseFilterParamDto } from '@common/database/dtos/base-filter.dto';
declare const FilterParticipantDto_base: import("@nestjs/common").Type<Omit<BaseFilterParamDto, "date_from" | "date_to">>;
export declare class FilterParticipantDto extends FilterParticipantDto_base {
    survey_id: number;
    date_from?: Date;
    date_to?: Date;
}
export {};
