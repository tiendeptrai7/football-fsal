import { DataSource, Repository } from 'typeorm';
import { FilterSystemDto } from '../../dtos/filter-system.dto';
import { System } from '../entities/system.entity';
export declare class SystemRepository extends Repository<System> {
    constructor(dataSource: DataSource);
    getList(params: FilterSystemDto): Promise<[System[], number]>;
    getValueByKey(key: string): Promise<string>;
}
