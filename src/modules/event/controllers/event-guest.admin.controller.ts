import { Auth } from '@auth/decorators/auth.jwt.decorator';
import { ListPaginate } from '@common/database/types/database.type';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { FilterEventGuestDto } from '../dtos/filter-event-guest.dto';
import { EventGuest } from '../repository/entities/event-guest.entity';
import { EventGuestService } from '../services/event-guest.service';

@Controller('event-guest')
@ApiTags('Event guest admin management')
@ApiBearerAuth('accessToken')
export class EventGuestAdminController {
  constructor(private readonly service: EventGuestService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'event_guest_manage_read' })
  async getList(
    @Query() param: FilterEventGuestDto,
  ): Promise<ListPaginate<EventGuest>> {
    return await this.service.getList(param);
  }

  @Delete(':id([0-9]+)')
  @Auth({ permissions: 'event_guest_manage_delete' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }

  @Put('toggle/qr/:id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'event_guest_manage_update' })
  async toggle(@Param('id') id: number): Promise<void> {
    return await this.service.toggleQRCode(id);
  }
}
