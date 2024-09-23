import { EStatus } from '@app/constant/app.enum';
export declare class BaseFilterParamDto {
    filter?: string;
    limit: number;
    page: number;
    sorting?: string;
    status?: EStatus;
    date_from?: Date;
    date_to?: Date;
}
