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

  @Post('copy/:id([0-9]+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'survey_manage_create' })
  async copy(@Param('id') id: number): Promise<void> {
    return this.service.copy(id);
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

  @Get('reports')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'survey_report_manage_read' })
  async getListReport(
    @Query() param: BaseFilterParamDto,
  ): Promise<ListPaginate<Survey>> {
    return await this.service.getListRport(param);
  }

  @Get('reports/participants')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'survey_report_manage_read' })
  async getListParticipantReport(
    @Query() param: FilterParticipantDto,
  ): Promise<ListPaginate<EventGuest>> {
    return await this.service.getListParticipantReport(param);
  }

  @Get('reports/overview/:id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'survey_report_manage_read' })
  async getOverviewReport(@Param('id') id: number): Promise<OverviewResponse> {
    return await this.service.getOverviewReport(id);
  }

  @Get('reports/detail/:id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'survey_report_manage_read' })
  async getDetailReport(@Param('id') id: number): Promise<DetailResponse[]> {
    return await this.service.getDetailReport(id);
  }

  @Get('reports/detail/bar-chart/:id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'survey_report_manage_read' })
  async getBarChart(
    @Param('id') id: number,
    @Query() param: ChartDto,
  ): Promise<BarChartResponse> {
    return await this.service.getBarChart(param, id);
  }

  @Get('reports/detail/short-answer/:id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'survey_report_manage_read' })
  async getShortAnswer(
    @Param('id') id: number,
    @Query() param: ChartDto,
  ): Promise<ShortAnswerResponse[]> {
    return await this.service.getShortAnswer(param, id);
  }

  @Get('reports/detail/line-chart/:id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'survey_report_manage_read' })
  async getLineChart(
    @Param('id') id: number,
    @Query() param: ChartDto,
  ): Promise<LineChartResponse> {
    return await this.service.getLineChart(param, id);
  }
}
