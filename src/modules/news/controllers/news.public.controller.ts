import { Auth } from '@auth/decorators/auth.jwt.decorator';
import { AuthUser } from '@auth/types/auth.type';
import { ListPaginate } from '@common/database/types/database.type';
import { AUser } from '@common/request/decorators/params/request.params.decorator';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { FilterNewsDto } from '../dtos/filter-news.dto';
import { News } from '../repository/entities/news.entity';
import { NewsService } from '../services/news.service';

@Controller('news')
@ApiTags('News management')
@ApiBearerAuth('accessToken')
export class NewsPublicController {
  constructor(private readonly service: NewsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth({ scope: 'mini_app', anonymous: true })
  async getList(@Query() param: FilterNewsDto): Promise<ListPaginate<News>> {
    return await this.service.getList(param);
  }

  @Get(':id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ scope: 'mini_app', anonymous: true })
  async getById(
    @Param('id') id: number,
    @AUser() user: AuthUser,
  ): Promise<News> {
    return await this.service.userGetById(id, user);
  }
}
