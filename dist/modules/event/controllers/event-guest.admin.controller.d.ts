import { ListPaginate } from '@common/database/types/database.type';
import { FilterEventGuestDto } from '../dtos/filter-event-guest.dto';
import { EventGuest } from '../repository/entities/event-guest.entity';
import { EventGuestService } from '../services/event-guest.service';
export declare class EventGuestAdminController {
    private readonly service;
    constructor(service: EventGuestService);
    getList(param: FilterEventGuestDto): Promise<ListPaginate<EventGuest>>;
    delete(id: number): Promise<void>;
    toggle(id: number): Promise<void>;
}
