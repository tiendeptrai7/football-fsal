import { Auth } from '@auth/decorators/auth.jwt.decorator';
import { ListPaginate } from '@common/database/types/database.type';
import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { FilterEventGuestDto } from '../dtos/filter-event-guest.dto';
import { EventGuest } from '../repository/entities/event-guest.entity';
import { EventGuestService } from '../services/event-guest.service';

@Controller('event-guests')
@ApiTags('Event Guest organizer')
@ApiBearerAuth('accessToken')
export class EventGuestOrganizerController {
  constructor(private readonly service: EventGuestService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Auth({ scope: 'web', roles: ['organizer'] })
  async getGuestList(
    @Query() param: FilterEventGuestDto,
  ): Promise<ListPaginate<EventGuest>> {
    return await this.service.getList(param);
  }
}
