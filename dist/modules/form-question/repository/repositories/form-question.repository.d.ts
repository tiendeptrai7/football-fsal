import { FormQuestionDto } from '@modules/form-question/dtos/form-question.dto';
import { DataSource, Repository } from 'typeorm';
import { FilterFormQuestionDto } from '../../dtos/filter-form-question.dto';
import { FormQuestion } from '../entities/form-question.entity';
export declare class FormQuestionRepository extends Repository<FormQuestion> {
    constructor(dataSource: DataSource);
    getList(params: FilterFormQuestionDto): Promise<[FormQuestion[], number]>;
    getFormQuestions(form_id?: number): Promise<FormQuestionDto[]>;
}
