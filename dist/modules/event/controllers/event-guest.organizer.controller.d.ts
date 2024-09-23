import { ListPaginate } from '@common/database/types/database.type';
import { FilterEventGuestDto } from '../dtos/filter-event-guest.dto';
import { EventGuest } from '../repository/entities/event-guest.entity';
import { EventGuestService } from '../services/event-guest.service';
export declare class EventGuestOrganizerController {
    private readonly service;
    constructor(service: EventGuestService);
    getGuestList(param: FilterEventGuestDto): Promise<ListPaginate<EventGuest>>;
}
