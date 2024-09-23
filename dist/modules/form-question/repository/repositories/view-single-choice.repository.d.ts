import { ChartDto } from '@modules/survey/dtos/chart-report.dto';
import { MultiChoiceData } from '@modules/survey/interfaces/report-survey-response.interface';
import { DataSource, Repository } from 'typeorm';
import { ViewSubmitSingleChoice } from '../entities/view-single-choice.entity';
export declare class ViewSingleChoiceRepository extends Repository<ViewSubmitSingleChoice> {
    constructor(dataSource: DataSource);
    getBySurvey(params: ChartDto, id: number): Promise<MultiChoiceData[]>;
}
