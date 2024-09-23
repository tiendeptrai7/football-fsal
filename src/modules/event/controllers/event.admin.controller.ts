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
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateEventDto } from '../dtos/create-event.dto';
import {
  FilterEventDto,
  FilterEventRelatedHcp,
} from '../dtos/filter-event.dto';
import { UpdateEventDto } from '../dtos/update-event.dto';
import { EventRelatedHCPResponse } from '../interfaces/event-response.interface';
import { Event } from '../repository/entities/event.entity';
import { EventService } from '../services/event.service';

@Controller('events')
@ApiTags('Event admin management')
@ApiBearerAuth('accessToken')
export class EventAdminController {
  constructor(private readonly service: EventService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'event_manage_read' })
  async getList(@Query() param: FilterEventDto): Promise<ListPaginate<Event>> {
    return await this.service.getList(param);
  }

  @Get('/hcp-relations')
  @HttpCode(HttpStatus.OK)
  @Auth()
  async getListEventRelatedHCP(
    @Query() params: FilterEventRelatedHcp,
  ): Promise<EventRelatedHCPResponse[]> {
    return await this.service.getListEventRelatedHCP(params);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Auth({ permissions: 'event_manage_create' })
  async create(@Body() body: CreateEventDto): Promise<void> {
    return this.service.create(body);
  }

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'event_manage_update' })
  async update(@Body() body: UpdateEventDto): Promise<void> {
    return await this.service.update(body);
  }

  @Get(':id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'event_manage_read' })
  async getById(@Param('id') id: number): Promise<Event> {
    return await this.service.getById(id);
  }

  @Put('toggle/status/:id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'event_manage_update' })
  async toggle(@Param('id') id: number): Promise<void> {
    return await this.service.toggle(id);
  }

  @Put('toggle/public/:id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'event_manage_update' })
  async togglePublic(@Param('id') id: number): Promise<void> {
    return await this.service.togglePublic(id);
  }
}
