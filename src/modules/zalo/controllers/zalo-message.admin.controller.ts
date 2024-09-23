import { Auth } from '@auth/decorators/auth.jwt.decorator';
import { AuthUser } from '@auth/types/auth.type';
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

import { FilterZaloMessageDto } from '../dtos/filter-zalo-message.dto';
import { ObserveMessageDto } from '../dtos/update-zalo-message.dto';
import { ZaloMessageService } from '../services/zalo-message.service';

@Controller('zalo-messages')
@ApiTags('Zalo message management')
@ApiBearerAuth('accessToken')
export class ZaloMessageAdminController {
  constructor(private readonly service: ZaloMessageService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'zalo_message_manage_observe' })
  async getList(@Query() params: FilterZaloMessageDto) {
    return await this.service.getListOAMessage(params);
  }

  @Get('/observers')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'zalo_message_manage_observe' })
  async getObserverList(): Promise<
    { observer_id: string; observer_name: string }[]
  > {
    return await this.service.getObserverList();
  }

  @Put('/observes')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'zalo_message_manage_observe' })
  async observeMessages(
    @AUser() user: AuthUser,
    @Body() body: ObserveMessageDto,
  ): Promise<void> {
    return await this.service.observeMessage(user, body);
  }

  @Get('export')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'zalo_message_manage_observe' })
  async export(@Query() params: FilterZaloMessageDto) {
    return await this.service.export(params);
  }
}
