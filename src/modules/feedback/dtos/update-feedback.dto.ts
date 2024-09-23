import { UpdateFormQuestionDto$ } from '@modules/form-question/dtos/update-form-question.dto';
import { UpdateAnswerDto } from '@modules/question/dtos/update-answer.dto';
import { UpdateQuestionDto } from '@modules/question/dtos/update-question.dto';
import { OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

import { CreateFeedbackDto } from './create-feedback.dto';
import { CreateFeedbackDocumentDto } from './create-feedback-document.dto';
import { UpdateFeedbackDocumentDto$ } from './update-feedback-document.dto';

export class UpdateFeedbackDto extends OmitType(
  PartialType(CreateFeedbackDto),
  ['feedback_documents', 'form_questions'],
) {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateFeedbackDocumentDto$)
  feedback_documents: UpdateFeedbackDocumentDto$[];

  @IsOptional()
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateFormQuestionDto$)
  form_questions: UpdateFormQuestionDto$[];
}

// ------------------------------------------------------------

export class UpdateFeedbackDocumentDto extends CreateFeedbackDocumentDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class UpdateFeedbackFormDto {
  @IsNotEmpty()
  @Type(() => UpdateFeedbackDto)
  feedback: UpdateFeedbackDto;

  @IsOptional()
  @Type(() => UpdateFeedbackDocumentDto)
  feedback_document?: UpdateFeedbackDocumentDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateFormQuestionDto)
  form_questions?: UpdateFormQuestionDto[];
}

export class UpdateFormQuestionDto {
  @IsNotEmpty()
  @Type(() => UpdateQuestionDto)
  question: UpdateQuestionDto;

  @ValidateNested({ each: true })
  @Type(() => UpdateAnswerDto)
  @IsOptional()
  answer?: UpdateAnswerDto[];
}
