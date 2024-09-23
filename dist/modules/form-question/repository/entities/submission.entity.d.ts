import { EQuestionType } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { EventGuest } from '@modules/event/repository/entities/event-guest.entity';
import { FormQuestion } from './form-question.entity';
import { SubmissionAnswer } from './submission-answer.entity';
export declare class Submission extends BaseEntity {
    question_type: EQuestionType;
    question_content: string;
    answer_value: string;
    answer_text: string;
    form_question_id: number;
    form_question: FormQuestion;
    event_guest_id: number;
    event_guest: EventGuest;
    submission_answers: SubmissionAnswer[];
}
