import { BaseFilterParamDto } from '@common/database/dtos/base-filter.dto';
import { DataSource, Repository } from 'typeorm';
import { ReminderHistory } from '../entities/reminder-history.entity';
export declare class ReminderHistoryRepository extends Repository<ReminderHistory> {
    constructor(dataSource: DataSource);
    getList(params: BaseFilterParamDto, user_id?: string): Promise<[ReminderHistory[], number]>;
    userGetById(id: number, user_id?: string): Promise<ReminderHistory>;
}
