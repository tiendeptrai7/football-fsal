import { UpdateQuestionDto$ } from '@modules/question/dtos/update-question.dto';
import { CreateFormQuestionDto } from './create-form-question.dto';
declare const UpdateFormQuestionDto$_base: import("@nestjs/common").Type<Omit<Partial<CreateFormQuestionDto>, "question">>;
export declare class UpdateFormQuestionDto$ extends UpdateFormQuestionDto$_base {
    id: number;
    question: UpdateQuestionDto$;
}
export {};
