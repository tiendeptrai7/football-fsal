import { CreateQuestionDto } from './create-question.dto';
import { UpdateAnswerDto$ } from './update-answer.dto';
export declare class UpdateQuestionDto extends CreateQuestionDto {
}
declare const UpdateQuestionDto$_base: import("@nestjs/common").Type<Omit<Partial<CreateQuestionDto>, "answers">>;
export declare class UpdateQuestionDto$ extends UpdateQuestionDto$_base {
    id: number;
    answers: UpdateAnswerDto$[];
}
export {};
