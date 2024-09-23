import { AuthUser } from '@auth/types/auth.type';
import { ListPaginate } from '@common/database/types/database.type';
import { Event } from '@modules/event/repository/entities/event.entity';
import { FilterReminderPublicDto } from '../dtos/filter-reminder.dto';
import { ReminderHistory } from '../repository/entities/reminder-history.entity';
import { ReminderService } from '../services/reminder.service';
export declare class ReminderPublicController {
    private readonly service;
    constructor(service: ReminderService);
    getList(param: FilterReminderPublicDto, user: AuthUser): Promise<ListPaginate<Event>>;
    getById(id: number, user: AuthUser): Promise<ReminderHistory>;
}
