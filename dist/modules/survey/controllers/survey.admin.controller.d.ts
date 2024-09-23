import { BaseFilterParamDto } from '@common/database/dtos/base-filter.dto';
import { ListPaginate } from '@common/database/types/database.type';
import { EventGuest } from '@modules/event/repository/entities/event-guest.entity';
import { ChartDto } from '../dtos/chart-report.dto';
import { CreateSurveyFormDto } from '../dtos/create-survey.dto';
import { FilterSurveyDto } from '../dtos/filter-survey.dto';
import { FilterParticipantDto } from '../dtos/participant-report-filter.dto';
import { UpdateSurveyFormDto } from '../dtos/update-survey.dto';
import { BarChartResponse, DetailResponse, LineChartResponse, OverviewResponse, ShortAnswerResponse } from '../interfaces/report-survey-response.interface';
import { Survey } from '../repository/entities/survey.entity';
import { SurveyAdminService } from '../services/survey.admin.service';
export declare class SurveyAdminController {
    private readonly service;
    constructor(service: SurveyAdminService);
    getList(param: FilterSurveyDto): Promise<ListPaginate<Survey>>;
    create(body: CreateSurveyFormDto): Promise<void>;
    getById(id: number): Promise<Survey>;
    copy(id: number): Promise<void>;
    update(body: UpdateSurveyFormDto): Promise<void>;
    toggle(id: number): Promise<void>;
    getListReport(param: BaseFilterParamDto): Promise<ListPaginate<Survey>>;
    getListParticipantReport(param: FilterParticipantDto): Promise<ListPaginate<EventGuest>>;
    getOverviewReport(id: number): Promise<OverviewResponse>;
    getDetailReport(id: number): Promise<DetailResponse[]>;
    getBarChart(id: number, param: ChartDto): Promise<BarChartResponse>;
    getShortAnswer(id: number, param: ChartDto): Promise<ShortAnswerResponse[]>;
    getLineChart(id: number, param: ChartDto): Promise<LineChartResponse>;
}
