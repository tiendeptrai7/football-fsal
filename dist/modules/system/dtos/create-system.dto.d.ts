import { EStatus, ESystemType } from '@app/constant/app.enum';
export declare class CreateSystemDto {
    name: string;
    key: string;
    value: string;
    unit: ESystemType;
    group: string;
    is_public: EStatus;
    status: EStatus;
}
