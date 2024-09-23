import { EStatus, ESystemType } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
export declare class System extends BaseEntity {
    name: string;
    key: string;
    value: string;
    unit: ESystemType;
    group: string;
    status: EStatus;
    is_public: EStatus;
}
