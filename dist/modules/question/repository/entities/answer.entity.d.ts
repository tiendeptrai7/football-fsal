import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { SubmissionAnswer } from '@modules/form-question/repository/entities/submission-answer.entity';
import { Question } from './question.entity';
export declare class Answer extends BaseEntity {
    content: string;
    require_input: EStatus;
    question_id: number;
    question: Question;
    submission_answers: SubmissionAnswer[];
}
