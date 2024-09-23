import { EStatus } from '@app/constant/app.enum';
import { BaseFilterParamDto } from '@common/database/dtos/base-filter.dto';
export declare class FilterSystemDto extends BaseFilterParamDto {
    group: string;
    is_public: EStatus;
}
