import { AuthUser } from '@auth/types/auth.type';
import { EventGuestRepository } from '@modules/event/repository/repositories/event-guest.repository';
import { SubmissionRepository } from '@modules/form-question/repository/repositories/submission.repository';
import { FormQuestionService } from '@modules/form-question/services/form-question.service';
import { I18nService } from 'nestjs-i18n';
import { SubmissionSurveyDto } from '../dtos/submit-survey.dto';
import { SurveyPublicListResponse } from '../interfaces/survey-response.interface';
import { Survey } from '../repository/entities/survey.entity';
import { SurveyRepository } from '../repository/repositories/survey.repository';
export declare class SurveyPublicService {
    private readonly surveyRepository;
    private readonly submissionRepository;
    private readonly eventGuestRepository;
    private readonly formQuestionService;
    private surveyMessage;
    private eventGuestMessage;
    constructor(i18nService: I18nService, surveyRepository: SurveyRepository, submissionRepository: SubmissionRepository, eventGuestRepository: EventGuestRepository, formQuestionService: FormQuestionService);
    getList(user: AuthUser): Promise<SurveyPublicListResponse[]>;
    getById(id: number): Promise<Survey>;
    getFormQuestion(user: AuthUser, id: number): Promise<Survey>;
    submit(user: AuthUser, input: SubmissionSurveyDto): Promise<void>;
}
