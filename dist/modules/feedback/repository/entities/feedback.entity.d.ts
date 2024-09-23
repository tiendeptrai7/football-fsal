import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { Event } from '@modules/event/repository/entities/event.entity';
import { FormQuestion } from '@modules/form-question/repository/entities/form-question.entity';
import { FeedbackDocument } from './feedback-document.entity';
export declare class Feedback extends BaseEntity {
    name: string;
    code: string;
    feedback_days_before: number;
    feedback_expire_days: number;
    feedback_send_at: Date;
    feedback_expire_at: Date;
    status: EStatus;
    event_id: number;
    event: Event;
    feedback_documents: FeedbackDocument[];
    form_questions: FormQuestion[];
}
