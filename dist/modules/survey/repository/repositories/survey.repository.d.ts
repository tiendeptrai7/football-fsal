import { BaseFilterParamDto } from '@common/database/dtos/base-filter.dto';
import { FilterSurveyDto } from '@modules/survey/dtos/filter-survey.dto';
import { DataSource, Repository } from 'typeorm';
import { Survey } from '../entities/survey.entity';
export declare class SurveyRepository extends Repository<Survey> {
    constructor(dataSource: DataSource);
    getList(params: FilterSurveyDto): Promise<[Survey[], number]>;
    getListReport(params: BaseFilterParamDto): Promise<[Survey[], number]>;
    getOverviewReport(id: number): Promise<Survey>;
    getDetailReport(id: number): Promise<Survey>;
    getByUser(user_id: string): Promise<Survey[]>;
    getFormQuestion(user_id: string, id: number): Promise<Survey>;
    getById(id: number): Promise<Survey>;
}
