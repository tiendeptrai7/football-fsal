import { EFormType } from '@app/constant/app.enum';
import { QuestionDto } from '@modules/question/dtos/question.dto';
export declare class FormQuestionDto {
    id: number;
    question_id: number;
    form_type: EFormType;
    question: QuestionDto;
}
