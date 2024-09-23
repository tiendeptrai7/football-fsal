import { Auth } from '@auth/decorators/auth.jwt.decorator';
import { AuthUser } from '@auth/types/auth.type';
import { ListPaginate } from '@common/database/types/database.type';
import { AUser } from '@common/request/decorators/params/request.params.decorator';
import { Event } from '@modules/event/repository/entities/event.entity';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { FilterReminderPublicDto } from '../dtos/filter-reminder.dto';
import { ReminderHistory } from '../repository/entities/reminder-history.entity';
import { ReminderService } from '../services/reminder.service';

@Controller('reminders')
@ApiTags('reminders')
@ApiBearerAuth('accessToken')
export class ReminderPublicController {
  constructor(private readonly service: ReminderService) {}

  @Get('histories')
  @HttpCode(HttpStatus.OK)
  @Auth({ scope: 'mini_app' })
  async getList(
    @Query() param: FilterReminderPublicDto,
    @AUser() user: AuthUser,
  ): Promise<ListPaginate<Event>> {
    return await this.service.getHistoryList(param, user);
  }

  @Get(':id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ scope: 'mini_app' })
  async getById(
    @Param('id') id: number,
    @AUser() user: AuthUser,
  ): Promise<ReminderHistory> {
    return await this.service.getHistoryById(id, user);
  }
}
