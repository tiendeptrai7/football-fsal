import { BaseDateEntity } from './base-date.entity';
export declare class BaseUUIDEntity extends BaseDateEntity {
    id: string;
    deleted_at: Date;
}
