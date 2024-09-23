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

import { SubmissionSurveyDto } from '../dtos/submit-survey.dto';
import { SurveyPublicListResponse } from '../interfaces/survey-response.interface';
import { Survey } from '../repository/entities/survey.entity';
import { SurveyPublicService } from '../services/survey.public.service';

@Controller('surveys')
@ApiTags('Survey public')
@ApiBearerAuth('accessToken')
export class SurveyPublicController {
  constructor(private readonly service: SurveyPublicService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth({ scope: 'mini_app' })
  async getList(@AUser() user: AuthUser): Promise<SurveyPublicListResponse[]> {
    return await this.service.getList(user);
  }

  @Get(':id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ scope: 'mini_app' })
  async getById(
    @AUser() user: AuthUser,
    @Param('id') id: number,
  ): Promise<Survey> {
    return await this.service.getFormQuestion(user, id);
  }

  @Post('/submit')
  @HttpCode(HttpStatus.CREATED)
  @Auth({ scope: 'mini_app' })
  async submit(
    @Body() body: SubmissionSurveyDto,
    @AUser() user: AuthUser,
  ): Promise<void> {
    return this.service.submit(user, body);
  }
}
