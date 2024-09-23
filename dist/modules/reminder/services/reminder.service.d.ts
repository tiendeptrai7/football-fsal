import { AuthUser } from '@auth/types/auth.type';
import { ListPaginate } from '@common/database/types/database.type';
import { Event } from '@modules/event/repository/entities/event.entity';
import { EventService } from '@modules/event/services/event.service';
import { I18nService } from 'nestjs-i18n';
import { CreateReminderDto } from '../dtos/create-reminder.dto';
import { FilterReminderDto, FilterReminderPublicDto } from '../dtos/filter-reminder.dto';
import { UpdateReminderDto } from '../dtos/update-reminder.dto';
import { Reminder } from '../repository/entities/reminder.entity';
import { ReminderHistory } from '../repository/entities/reminder-history.entity';
import { ReminderRepository } from '../repository/repositories/reminder.repository';
import { ReminderHistoryRepository } from '../repository/repositories/reminder-history.repository';
export declare class ReminderService {
    private readonly reminderRepository;
    private readonly reminderHistoryRepository;
    private readonly eventService;
    private reminderMessage;
    private reminderHistoryMessage;
    constructor(reminderRepository: ReminderRepository, reminderHistoryRepository: ReminderHistoryRepository, eventService: EventService, i18nService: I18nService);
    create(input: CreateReminderDto): Promise<void>;
    getById(id: number): Promise<Reminder>;
    getList(params: FilterReminderDto): Promise<ListPaginate<Reminder>>;
    getHistoryList(params: FilterReminderPublicDto, user?: AuthUser): Promise<ListPaginate<Event>>;
    getHistoryById(id: number, user: AuthUser): Promise<ReminderHistory>;
    update(input: UpdateReminderDto): Promise<void>;
}
