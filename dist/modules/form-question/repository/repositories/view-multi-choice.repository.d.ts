import { ChartDto } from '@modules/survey/dtos/chart-report.dto';
import { MultiChoiceData } from '@modules/survey/interfaces/report-survey-response.interface';
import { DataSource, Repository } from 'typeorm';
import { ViewSubmitMultiChoice } from '../entities/view-multi-choice.entity';
export declare class ViewMultiChoiceRepository extends Repository<ViewSubmitMultiChoice> {
    constructor(dataSource: DataSource);
    getBySurvey(params: ChartDto, id: number): Promise<MultiChoiceData[]>;
}
