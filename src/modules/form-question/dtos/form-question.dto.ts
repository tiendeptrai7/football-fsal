import { EFormType } from '@app/constant/app.enum';
import { QuestionDto } from '@modules/question/dtos/question.dto';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class FormQuestionDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  question_id: number;

  @IsNotEmpty()
  @IsEnum(EFormType)
  form_type: EFormType;

  @IsNotEmpty()
  @Type(() => QuestionDto)
  question: QuestionDto;
}
