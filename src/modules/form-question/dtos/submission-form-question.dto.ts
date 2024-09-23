import { EQuestionType } from '@app/constant/app.enum';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class SubmissionAnswerDto {
  @IsNotEmpty()
  @IsNumber()
  answer_id: number;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  answer_text: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  answer_content: string;
}

export class SubmissionFormDto {
  @IsNotEmpty()
  @IsEnum(EQuestionType)
  question_type: EQuestionType;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  question_content: string;

  @IsNotEmpty()
  @IsNumber()
  form_question_id: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  answer_value: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  answer_text: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SubmissionAnswerDto)
  submission_answers: SubmissionAnswerDto[];
}

export class CreateSubmissionDto {
  @IsNotEmpty()
  @IsNumber()
  form_id: number;

  @ValidateNested({ each: true })
  @Type(() => SubmissionFormDto)
  @IsNotEmpty()
  submission_form: SubmissionFormDto[];
}
