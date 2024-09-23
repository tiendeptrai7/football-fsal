import { CacheService } from '@common/cache/services/cache.service';
import { ListPaginate } from '@common/database/types/database.type';
import { EventService } from '@modules/event/services/event.service';
import { FormQuestionService } from '@modules/form-question/services/form-question.service';
import { QuestionService } from '@modules/question/services/question.service';
import { I18nService } from 'nestjs-i18n';
import { CreateFeedbackDto } from '../dtos/create-feedback.dto';
import { FilterFeedbackDto } from '../dtos/filter-feedback.dto';
import { UpdateFeedbackDto } from '../dtos/update-feedback.dto';
import { Feedback } from '../repository/entities/feedback.entity';
import { FeedbackRepository } from '../repository/repositories/feedback.repository';
import { FeedbackDocumentService } from './feedback-document.service';
export declare class FeedbackService {
    private readonly cacheService;
    private readonly eventService;
    private readonly questionService;
    private readonly formQuestionService;
    private readonly feedbackDocumentService;
    private readonly feedbackRepository;
    private eventMessage;
    private feedbackMessage;
    constructor(i18nService: I18nService, cacheService: CacheService, eventService: EventService, questionService: QuestionService, formQuestionService: FormQuestionService, feedbackDocumentService: FeedbackDocumentService, feedbackRepository: FeedbackRepository);
    getList(params: FilterFeedbackDto): Promise<ListPaginate<Feedback>>;
    getById(id: number): Promise<Feedback>;
    create(input: CreateFeedbackDto): Promise<void>;
    update(input: UpdateFeedbackDto): Promise<void>;
    toggle(id: number): Promise<void>;
    _getINCRCode(): Promise<string>;
}
