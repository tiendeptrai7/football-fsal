import { ESurveyFormStatus } from '@app/constant/app.enum';
import { Survey } from '../repository/entities/survey.entity';
export interface SurveyPublicListResponse {
    data: Survey;
    status: ESurveyFormStatus;
}
