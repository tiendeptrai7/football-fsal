import { Auth } from '@auth/decorators/auth.jwt.decorator';
import { AuthUser } from '@auth/types/auth.type';
import { ListPaginate } from '@common/database/types/database.type';
import { AUser } from '@common/request/decorators/params/request.params.decorator';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { FilterEventGuestDto } from '../dtos/filter-event-guest.dto';
import { UpdateInvitationDto } from '../dtos/update-event-guest.dto';
import { EventGuest } from '../repository/entities/event-guest.entity';
import { EventGuestService } from '../services/event-guest.service';

@Controller('event-guests')
@ApiTags('Event Guest public')
@ApiBearerAuth('accessToken')
export class EventGuestPublicController {
  constructor(private readonly service: EventGuestService) {}

  @Put('/invitations')
  @HttpCode(HttpStatus.OK)
  @Auth({ scope: 'mini_app' })
  async replyInvitation(
    @AUser() user: AuthUser,
    @Body() body: UpdateInvitationDto,
  ) {
    return await this.service.replyInvitation(user, body);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Auth({ scope: 'mini_app' })
  async getGuestList(
    @Query() param: FilterEventGuestDto,
  ): Promise<ListPaginate<EventGuest>> {
    return await this.service.getList(param);
  }
}
