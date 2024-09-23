import { ListPaginate } from '@common/database/types/database.type';
import { CreateEventDto } from '../dtos/create-event.dto';
import { FilterEventDto, FilterEventRelatedHcp } from '../dtos/filter-event.dto';
import { UpdateEventDto } from '../dtos/update-event.dto';
import { EventRelatedHCPResponse } from '../interfaces/event-response.interface';
import { Event } from '../repository/entities/event.entity';
import { EventService } from '../services/event.service';
export declare class EventAdminController {
    private readonly service;
    constructor(service: EventService);
    getList(param: FilterEventDto): Promise<ListPaginate<Event>>;
    getListEventRelatedHCP(params: FilterEventRelatedHcp): Promise<EventRelatedHCPResponse[]>;
    create(body: CreateEventDto): Promise<void>;
    update(body: UpdateEventDto): Promise<void>;
    getById(id: number): Promise<Event>;
    toggle(id: number): Promise<void>;
    togglePublic(id: number): Promise<void>;
}
