import { EStatus } from '@app/constant/app.enum';
import { CreateFormQuestionDto } from '@modules/form-question/dtos/create-form-question.dto';
export declare class CreateSurveyFormDto {
    name: string;
    event_id: number;
    status: EStatus;
    started_at: Date;
    ended_at: Date;
    form_questions: CreateFormQuestionDto[];
}
