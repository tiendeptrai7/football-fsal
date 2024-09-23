import { BaseEntity as TypeOrmBaseEntity } from 'typeorm';
export declare class BaseDateEntity extends TypeOrmBaseEntity {
    created_at: Date;
    updated_at: Date;
}
