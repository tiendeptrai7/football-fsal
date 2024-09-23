import { BaseEntity } from '@common/database/entities/base.entity';
import { Feedback } from './feedback.entity';
export declare class FeedbackDocument extends BaseEntity {
    url: string;
    feedback_id: number;
    feedback: Feedback;
}
