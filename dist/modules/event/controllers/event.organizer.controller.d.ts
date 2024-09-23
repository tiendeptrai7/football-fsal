import { ListPaginate } from '@common/database/types/database.type';
import { CheckInDto } from '../dtos/create-event.dto';
import { FilterEventDto } from '../dtos/filter-event.dto';
import { Event } from '../repository/entities/event.entity';
import { EventGuest } from '../repository/entities/event-guest.entity';
import { EventService } from '../services/event.service';
export declare class EventOrganizerController {
    private readonly service;
    constructor(service: EventService);
    getList(param: FilterEventDto): Promise<ListPaginate<Event>>;
    getById(id: number): Promise<Event>;
    displayTicketInfo(qr_code: string): Promise<EventGuest>;
    checkIn(body: CheckInDto): Promise<void>;
}
