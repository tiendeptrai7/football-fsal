import { DataSource, Repository } from 'typeorm';
import { FeedbackDocument } from '../entities/feedback-document.entity';
export declare class FeedbackDocumentRepository extends Repository<FeedbackDocument> {
    constructor(dataSource: DataSource);
    getByUser(user_id: string, feedback_id: number): Promise<FeedbackDocument[]>;
}
