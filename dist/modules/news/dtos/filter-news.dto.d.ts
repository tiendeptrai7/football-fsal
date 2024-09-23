import { BaseFilterParamDto } from '@common/database/dtos/base-filter.dto';
declare const FilterNewsDto_base: import("@nestjs/common").Type<Omit<BaseFilterParamDto, "date_from" | "date_to">>;
export declare class FilterNewsDto extends FilterNewsDto_base {
    date_from: Date;
    date_to: Date;
}
export {};
