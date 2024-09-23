import { EStatus } from '@app/constant/app.enum';
import { BaseFilterParamDto } from '@common/database/dtos/base-filter.dto';
declare const FilterZaloMessageDto_base: import("@nestjs/common").Type<Omit<BaseFilterParamDto, "date_from" | "date_to">>;
export declare class FilterZaloMessageDto extends FilterZaloMessageDto_base {
    activities: EStatus;
    observe_by: string;
    message_type: string;
    date_from: Date;
    date_to: Date;
}
export {};
