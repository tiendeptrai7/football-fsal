import { BaseDateEntity } from '@common/database/entities/base-date.entity';
import { Answer } from '@modules/question/repository/entities/answer.entity';
import { Submission } from './submission.entity';
export declare class SubmissionAnswer extends BaseDateEntity {
    submission_id: number;
    answer_id: number;
    answer_content: string;
    answer_text: string;
    submission: Submission;
    answer: Answer;
}
