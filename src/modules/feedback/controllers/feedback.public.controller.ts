import { Auth } from '@auth/decorators/auth.jwt.decorator';
import { AuthUser } from '@auth/types/auth.type';
import { AUser } from '@common/request/decorators/params/request.params.decorator';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { SubmissionFeedbackDto } from '../dtos/submit-feedback.dto';
import { FeedbackPublicListResponse } from '../interfaces/feedback-response.interface';
import { Feedback } from '../repository/entities/feedback.entity';
import { FeedbackDocument } from '../repository/entities/feedback-document.entity';
import { FeedbackPublicService } from '../services/feedback.public.service';

@Controller('feedbacks')
@ApiTags('Feedback public')
@ApiBearerAuth('accessToken')
export class FeedbackPublicController {
  constructor(private readonly service: FeedbackPublicService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth({ scope: 'mini_app' })
  async getList(
    @AUser() user: AuthUser,
  ): Promise<FeedbackPublicListResponse[]> {
    return await this.service.getList(user);
  }

  @Get(':id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ scope: 'mini_app' })
  async getById(
    @Param('id') id: number,
    @AUser() user: AuthUser,
  ): Promise<Feedback> {
    return await this.service.getFormQuestion(user, id);
  }

  @Post('submit')
  @HttpCode(HttpStatus.CREATED)
  @Auth({ scope: 'mini_app' })
  async submit(
    @Body() body: SubmissionFeedbackDto,
    @AUser() user: AuthUser,
  ): Promise<void> {
    return this.service.submit(user, body);
  }

  @Get('documents/:id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ scope: 'mini_app' })
  async getListDocument(
    @AUser() user: AuthUser,
    @Param('id') id: number,
  ): Promise<FeedbackDocument[]> {
    return await this.service.getListDocument(user, id);
  }
}
