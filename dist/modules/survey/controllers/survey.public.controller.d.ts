import { AuthUser } from '@auth/types/auth.type';
import { SubmissionSurveyDto } from '../dtos/submit-survey.dto';
import { SurveyPublicListResponse } from '../interfaces/survey-response.interface';
import { Survey } from '../repository/entities/survey.entity';
import { SurveyPublicService } from '../services/survey.public.service';
export declare class SurveyPublicController {
    private readonly service;
    constructor(service: SurveyPublicService);
    getList(user: AuthUser): Promise<SurveyPublicListResponse[]>;
    getById(user: AuthUser, id: number): Promise<Survey>;
    submit(body: SubmissionSurveyDto, user: AuthUser): Promise<void>;
}
