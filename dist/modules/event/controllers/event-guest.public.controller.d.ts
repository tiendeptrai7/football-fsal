import { AuthUser } from '@auth/types/auth.type';
import { ListPaginate } from '@common/database/types/database.type';
import { FilterEventGuestDto } from '../dtos/filter-event-guest.dto';
import { UpdateInvitationDto } from '../dtos/update-event-guest.dto';
import { EventGuest } from '../repository/entities/event-guest.entity';
import { EventGuestService } from '../services/event-guest.service';
export declare class EventGuestPublicController {
    private readonly service;
    constructor(service: EventGuestService);
    replyInvitation(user: AuthUser, body: UpdateInvitationDto): Promise<void>;
    getGuestList(param: FilterEventGuestDto): Promise<ListPaginate<EventGuest>>;
}
