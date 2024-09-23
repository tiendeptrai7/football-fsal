import { DataSource, Repository } from 'typeorm';
import { FilterReminderDto } from '../../dtos/filter-reminder.dto';
import { Reminder } from '../entities/reminder.entity';
export declare class ReminderRepository extends Repository<Reminder> {
    constructor(dataSource: DataSource);
    getList(params: FilterReminderDto): Promise<[Reminder[], number]>;
}
