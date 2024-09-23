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

import { CreateFeedbackDto } from '../dtos/create-feedback.dto';
import { FilterFeedbackDto } from '../dtos/filter-feedback.dto';
import { UpdateFeedbackDto } from '../dtos/update-feedback.dto';
import { Feedback } from '../repository/entities/feedback.entity';
import { FeedbackService } from '../services/feedback.service';

@Controller('feedbacks')
@ApiTags('Feedback management')
@ApiBearerAuth('accessToken')
export class FeedbackAdminController {
  constructor(private readonly service: FeedbackService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'feedback_manage_read' })
  async getList(
    @Query() param: FilterFeedbackDto,
  ): Promise<ListPaginate<Feedback>> {
    return await this.service.getList(param);
  }

  @Get(':id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'feedback_manage_read' })
  async getById(@Param('id') id: number): Promise<Feedback> {
    return await this.service.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Auth({ permissions: 'feedback_manage_create' })
  async create(@Body() body: CreateFeedbackDto): Promise<void> {
    return await this.service.create(body);
  }

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'feedback_manage_update' })
  async update(@Body() body: UpdateFeedbackDto): Promise<void> {
    return await this.service.update(body);
  }

  @Put('toggle/status/:id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'feedback_manage_update' })
  async toggle(@Param('id') id: number): Promise<void> {
    return await this.service.toggle(id);
  }
}
