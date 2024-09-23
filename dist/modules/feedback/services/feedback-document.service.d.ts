import { I18nService } from 'nestjs-i18n';
import { FeedbackDocument } from '../repository/entities/feedback-document.entity';
import { FeedbackDocumentRepository } from '../repository/repositories/feedback-document.repository';
export declare class FeedbackDocumentService {
    private readonly feedbackDocumentRepository;
    private feedbackDocumentMessage;
    constructor(i18nService: I18nService, feedbackDocumentRepository: FeedbackDocumentRepository);
    getById(id: number): Promise<FeedbackDocument>;
}
