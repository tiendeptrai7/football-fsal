import { EFormType } from '@app/constant/app.enum';
import { CreateQuestionDto } from '@modules/question/dtos/create-question.dto';
import { UpdateQuestionDto } from '@modules/question/dtos/update-question.dto';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class FormOptionDto {
  @IsEnum(EFormType)
  @IsNotEmpty()
  form_type: EFormType;

  @IsNumber()
  @IsNotEmpty()
  form_id: number;
}

export class CreateFormQuestionDto {
  @IsNotEmpty()
  @Type(() => CreateQuestionDto)
  question: CreateQuestionDto;
}

export class UpdateFormQuestionDto {
  @IsNotEmpty()
  @Type(() => UpdateQuestionDto)
  question: UpdateQuestionDto;
}
