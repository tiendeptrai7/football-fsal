import { UpdateFormQuestionDto$ } from '@modules/form-question/dtos/update-form-question.dto';
import { UpdateAnswerDto } from '@modules/question/dtos/update-answer.dto';
import { UpdateQuestionDto } from '@modules/question/dtos/update-question.dto';
import { CreateFeedbackDto } from './create-feedback.dto';
import { CreateFeedbackDocumentDto } from './create-feedback-document.dto';
import { UpdateFeedbackDocumentDto$ } from './update-feedback-document.dto';
declare const UpdateFeedbackDto_base: import("@nestjs/common").Type<Omit<Partial<CreateFeedbackDto>, "form_questions" | "feedback_documents">>;
export declare class UpdateFeedbackDto extends UpdateFeedbackDto_base {
    id: number;
    feedback_documents: UpdateFeedbackDocumentDto$[];
    form_questions: UpdateFormQuestionDto$[];
}
export declare class UpdateFeedbackDocumentDto extends CreateFeedbackDocumentDto {
    id: number;
}
export declare class UpdateFeedbackFormDto {
    feedback: UpdateFeedbackDto;
    feedback_document?: UpdateFeedbackDocumentDto[];
    form_questions?: UpdateFormQuestionDto[];
}
export declare class UpdateFormQuestionDto {
    question: UpdateQuestionDto;
    answer?: UpdateAnswerDto[];
}
export {};
