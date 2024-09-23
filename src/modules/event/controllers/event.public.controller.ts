import { Auth } from '@auth/decorators/auth.jwt.decorator';
import { ListPaginate } from '@common/database/types/database.type';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { FilterEventDto } from '../dtos/filter-event.dto';
import { Event } from '../repository/entities/event.entity';
import { EventService } from '../services/event.service';

@Controller('events')
@ApiTags('Event public')
@ApiBearerAuth('accessToken')
export class EventPublicController {
  constructor(private readonly service: EventService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth({ scope: 'mini_app', anonymous: true })
  async getList(@Query() param: FilterEventDto): Promise<ListPaginate<Event>> {
    return await this.service.getListPublic(param);
  }

  @Get(':id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ scope: 'mini_app', anonymous: true })
  async getById(@Param('id') id: number): Promise<Event> {
    return await this.service.userGetById(id);
  }
}
