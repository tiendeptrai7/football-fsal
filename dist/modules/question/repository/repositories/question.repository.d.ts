import { DataSource, Repository } from 'typeorm';
import { FilterQuestionDto } from '../../dtos/filter-question.dto';
import { Question } from '../entities/question.entity';
export declare class QuestionRepository extends Repository<Question> {
    constructor(dataSource: DataSource);
    getList(params: FilterQuestionDto): Promise<[Question[], number]>;
}
