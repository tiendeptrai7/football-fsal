import { EQuestionType } from '@app/constant/app.enum';
export declare class SubmissionAnswerDto {
    answer_id: number;
    answer_text: string;
    answer_content: string;
}
export declare class SubmissionFormDto {
    question_type: EQuestionType;
    question_content: string;
    form_question_id: number;
    answer_value: string;
    answer_text: string;
    submission_answers: SubmissionAnswerDto[];
}
export declare class CreateSubmissionDto {
    form_id: number;
    submission_form: SubmissionFormDto[];
}
