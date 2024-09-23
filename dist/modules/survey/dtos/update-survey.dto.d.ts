import { UpdateFormQuestionDto$ } from '@modules/form-question/dtos/update-form-question.dto';
import { CreateSurveyFormDto } from './create-survey.dto';
declare const UpdateSurveyFormDto_base: import("@nestjs/common").Type<Omit<Partial<CreateSurveyFormDto>, "form_questions">>;
export declare class UpdateSurveyFormDto extends UpdateSurveyFormDto_base {
    id: number;
    form_questions: UpdateFormQuestionDto$[];
}
export {};
