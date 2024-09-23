import { EStatus } from '@app/constant/app.enum';
import { CreateFormQuestionDto } from '@modules/form-question/dtos/create-form-question.dto';
import { CreateFeedbackDocumentDto } from './create-feedback-document.dto';
export declare class FeedbackPublicDto {
    id: number;
    code: string;
    name: string;
    event_id: number;
    status: EStatus;
    started_at: Date;
    ended_at: Date;
}
export declare class CreateFeedbackDto {
    name: string;
    event_id: number;
    status: EStatus;
    feedback_days_before: number;
    feedback_expire_days: number;
    feedback_send_at: Date;
    feedback_expire_at: Date;
    feedback_documents: CreateFeedbackDocumentDto[];
    form_questions: CreateFormQuestionDto[];
}
