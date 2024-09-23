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

import { CreateNewsDto } from '../dtos/create-news.dto';
import { FilterNewsDto } from '../dtos/filter-news.dto';
import { UpdateNewsDto } from '../dtos/update-news.dto';
import { News } from '../repository/entities/news.entity';
import { NewsService } from '../services/news.service';

@Controller('news')
@ApiTags('News admin management')
@ApiBearerAuth('accessToken')
export class NewsAdminController {
  constructor(private readonly service: NewsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'news_manage_read' })
  async getList(@Query() param: FilterNewsDto): Promise<ListPaginate<News>> {
    return await this.service.adminGetList(param);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Auth({ permissions: 'news_manage_create' })
  async create(@Body() body: CreateNewsDto): Promise<void> {
    return this.service.create(body);
  }

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'news_manage_update' })
  async update(@Body() body: UpdateNewsDto): Promise<void> {
    return await this.service.update(body);
  }

  @Get(':id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'news_manage_read' })
  async getById(@Param('id') id: number): Promise<News> {
    return await this.service.getById(id);
  }

  @Put('toggle/status/:id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'news_manage_update' })
  async toggle(@Param('id') id: number): Promise<void> {
    return await this.service.toggle(id);
  }
}
