import { ListPaginate } from '@common/database/types/database.type';
import { FilterEventDto } from '../dtos/filter-event.dto';
import { Event } from '../repository/entities/event.entity';
import { EventService } from '../services/event.service';
export declare class EventPublicController {
    private readonly service;
    constructor(service: EventService);
    getList(param: FilterEventDto): Promise<ListPaginate<Event>>;
    getById(id: number): Promise<Event>;
}
