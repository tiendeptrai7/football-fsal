import { FilterFeedbackDto } from '@modules/feedback/dtos/filter-feedback.dto';
import { DataSource, Repository } from 'typeorm';
import { Feedback } from '../entities/feedback.entity';
export declare class FeedbackRepository extends Repository<Feedback> {
    constructor(dataSource: DataSource);
    getList(params: FilterFeedbackDto): Promise<[Feedback[], number]>;
    getByUser(user_id: string): Promise<Feedback[]>;
    getFormQuestion(user_id: string, id: number): Promise<Feedback>;
}
