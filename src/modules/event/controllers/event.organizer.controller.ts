import { Auth } from '@auth/decorators/auth.jwt.decorator';
import { ListPaginate } from '@common/database/types/database.type';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CheckInDto } from '../dtos/create-event.dto';
import { FilterEventDto } from '../dtos/filter-event.dto';
import { Event } from '../repository/entities/event.entity';
import { EventGuest } from '../repository/entities/event-guest.entity';
import { EventService } from '../services/event.service';

@Controller('events')
@ApiTags('Event organizer')
@ApiBearerAuth('accessToken')
export class EventOrganizerController {
  constructor(private readonly service: EventService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth({ scope: 'web', roles: ['organizer'] })
  async getList(@Query() param: FilterEventDto): Promise<ListPaginate<Event>> {
    return await this.service.getListPublic(param);
  }

  @Get(':id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ scope: 'web', roles: ['organizer'] })
  async getById(@Param('id') id: number): Promise<Event> {
    return await this.service.userGetById(id);
  }

  @Get(':qr_code')
  @HttpCode(HttpStatus.OK)
  @Auth({ scope: 'web', roles: ['organizer'] })
  async displayTicketInfo(
    @Param('qr_code') qr_code: string,
  ): Promise<EventGuest> {
    return await this.service.displayTicketInfo(qr_code);
  }

  @Post('check-in')
  @HttpCode(HttpStatus.OK)
  @Auth({ scope: 'web', roles: ['organizer'] })
  async checkIn(@Body() body: CheckInDto): Promise<void> {
    return await this.service.checkIn(body);
  }
}
