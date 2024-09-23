import { EFormType } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { Feedback } from '@modules/feedback/repository/entities/feedback.entity';
import { Question } from '@modules/question/repository/entities/question.entity';
import { Survey } from '@modules/survey/repository/entities/survey.entity';
import { Submission } from './submission.entity';
export declare class FormQuestion extends BaseEntity {
    order: number;
    form_type: EFormType;
    form_id: number;
    question_id: number;
    question: Question;
    submissions: Submission[];
    feedback: Feedback;
    survey: Survey;
}
