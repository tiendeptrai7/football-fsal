import { AuthUser } from '@auth/types/auth.type';
import { EventGuestRepository } from '@modules/event/repository/repositories/event-guest.repository';
import { SubmissionRepository } from '@modules/form-question/repository/repositories/submission.repository';
import { FormQuestionService } from '@modules/form-question/services/form-question.service';
import { I18nService } from 'nestjs-i18n';
import { SubmissionFeedbackDto } from '../dtos/submit-feedback.dto';
import { FeedbackPublicListResponse } from '../interfaces/feedback-response.interface';
import { Feedback } from '../repository/entities/feedback.entity';
import { FeedbackDocument } from '../repository/entities/feedback-document.entity';
import { FeedbackRepository } from '../repository/repositories/feedback.repository';
import { FeedbackDocumentRepository } from '../repository/repositories/feedback-document.repository';
export declare class FeedbackPublicService {
    private readonly feedbackRepository;
    private readonly feedbackDocumentRepository;
    private readonly submissionRepository;
    private readonly eventGuestRepository;
    private readonly formQuestionService;
    private feedbackMessage;
    private eventGuestMessage;
    constructor(i18nService: I18nService, feedbackRepository: FeedbackRepository, feedbackDocumentRepository: FeedbackDocumentRepository, submissionRepository: SubmissionRepository, eventGuestRepository: EventGuestRepository, formQuestionService: FormQuestionService);
    getList(user: AuthUser): Promise<FeedbackPublicListResponse[]>;
    getById(id: number): Promise<Feedback>;
    getFormQuestion(user: AuthUser, id: number): Promise<Feedback>;
    submit(user: AuthUser, input: SubmissionFeedbackDto): Promise<void>;
    getListDocument(user: AuthUser, id: number): Promise<FeedbackDocument[]>;
}
