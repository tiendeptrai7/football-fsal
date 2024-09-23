import { Auth } from '@auth/decorators/auth.jwt.decorator';
import { BaseFilterParamDto } from '@common/database/dtos/base-filter.dto';
import { ListPaginate } from '@common/database/types/database.type';
import { EventGuest } from '@modules/event/repository/entities/event-guest.entity';
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

import { ChartDto } from '../dtos/chart-report.dto';
import { CreateSurveyFormDto } from '../dtos/create-survey.dto';
import { FilterSurveyDto } from '../dtos/filter-survey.dto';
import { FilterParticipantDto } from '../dtos/participant-report-filter.dto';
import { UpdateSurveyFormDto } from '../dtos/update-survey.dto';
import {
  BarChartResponse,
  DetailResponse,
  LineChartResponse,
  OverviewResponse,
  ShortAnswerResponse,
} from '../interfaces/report-survey-response.interface';
import { Survey } from '../repository/entities/survey.entity';
import { SurveyAdminService } from '../services/survey.admin.service';

@Controller('surveys')
@ApiTags('Survey management')
@ApiBearerAuth('accessToken')
export class SurveyAdminController {
  constructor(private readonly service: SurveyAdminService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'survey_manage_read' })
  async getList(
    @Query() param: FilterSurveyDto,
  ): Promise<ListPaginate<Survey>> {
    return await this.service.getList(param);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Auth({ permissions: 'survey_manage_create' })
  async create(@Body() body: CreateSurveyFormDto): Promise<void> {
    return this.service.create(body);
  }

  @Get(':id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'survey_manage_read' })
  async getById(@Param('id') id: number): Promise<Survey> {
    return await this.service.getById(id);
  }

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'survey_manage_update' })
  async update(@Body() body: UpdateSurveyFormDto): Promise<void> {
    return await this.service.update(body);
  }

  @Put('toggle/status/:id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'survey_manage_update' })
  async toggle(@Param('id') id: number): Promise<void> {
    return await this.service.toggle(id);
  }
}
