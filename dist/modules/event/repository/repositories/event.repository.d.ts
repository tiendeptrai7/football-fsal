import { FilterEventDto, FilterEventRelatedHcp } from '@modules/event/dtos/filter-event.dto';
import { EventRelatedHCPResponse } from '@modules/event/interfaces/event-response.interface';
import { FilterReminderPublicDto } from '@modules/reminder/dtos/filter-reminder.dto';
import { DataSource, Repository } from 'typeorm';
import { Event } from '../entities/event.entity';
export declare class EventRepository extends Repository<Event> {
    constructor(dataSource: DataSource);
    getList(params: FilterEventDto, isPublic?: boolean): Promise<[Event[], number]>;
    getListEventRelatedHCP(params: FilterEventRelatedHcp): Promise<EventRelatedHCPResponse[]>;
    getListReminderHistory(params: FilterReminderPublicDto, user_id: string): Promise<[Event[], number]>;
}
