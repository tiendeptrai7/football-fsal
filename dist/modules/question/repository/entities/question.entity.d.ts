import { EQuestionType, EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { FormQuestion } from '@modules/form-question/repository/entities/form-question.entity';
import { Answer } from './answer.entity';
export declare class Question extends BaseEntity {
    content: string;
    type: EQuestionType;
    is_required: EStatus;
    answers: Answer[];
    form_questions: FormQuestion[];
}
