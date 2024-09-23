import { EFormType } from '@app/constant/app.enum';
import { CreateQuestionDto } from '@modules/question/dtos/create-question.dto';
import { UpdateQuestionDto } from '@modules/question/dtos/update-question.dto';
export declare class FormOptionDto {
    form_type: EFormType;
    form_id: number;
}
export declare class CreateFormQuestionDto {
    question: CreateQuestionDto;
}
export declare class UpdateFormQuestionDto {
    question: UpdateQuestionDto;
}
