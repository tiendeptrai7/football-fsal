import { DataSource, Repository } from 'typeorm';
import { Answer } from '../entities/answer.entity';
export declare class AnswerRepository extends Repository<Answer> {
    constructor(dataSource: DataSource);
}
