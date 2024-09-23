import { EQuestionType, EStatus } from '@app/constant/app.enum';
import { CreateAnswerDto } from './create-answer.dto';
export declare class CreateQuestionDto {
    type: EQuestionType;
    content: string;
    is_required: EStatus;
    answers: CreateAnswerDto[];
}
