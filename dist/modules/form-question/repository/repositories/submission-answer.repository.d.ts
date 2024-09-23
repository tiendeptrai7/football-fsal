import { DataSource, Repository } from 'typeorm';
import { SubmissionAnswer } from '../entities/submission-answer.entity';
export declare class SubmissionAnswerRepository extends Repository<SubmissionAnswer> {
    constructor(dataSource: DataSource);
}
