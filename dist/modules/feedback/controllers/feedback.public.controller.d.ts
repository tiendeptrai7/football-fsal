import { AuthUser } from '@auth/types/auth.type';
import { SubmissionFeedbackDto } from '../dtos/submit-feedback.dto';
import { FeedbackPublicListResponse } from '../interfaces/feedback-response.interface';
import { Feedback } from '../repository/entities/feedback.entity';
import { FeedbackDocument } from '../repository/entities/feedback-document.entity';
import { FeedbackPublicService } from '../services/feedback.public.service';
export declare class FeedbackPublicController {
    private readonly service;
    constructor(service: FeedbackPublicService);
    getList(user: AuthUser): Promise<FeedbackPublicListResponse[]>;
    getById(id: number, user: AuthUser): Promise<Feedback>;
    submit(body: SubmissionFeedbackDto, user: AuthUser): Promise<void>;
    getListDocument(user: AuthUser, id: number): Promise<FeedbackDocument[]>;
}
