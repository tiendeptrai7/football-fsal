import { EStatus } from '@app/constant/app.enum';
import {
  EndOf,
  StartOf,
  UtcToTimezone,
} from '@common/request/decorators/date/request.utc-to-timezone.decorator';
import { IsEnumValue } from '@common/request/validations/request.enum-value.validation';
import { CreateFormQuestionDto } from '@modules/form-question/dtos/create-form-question.dto';
import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

import { CreateFeedbackDocumentDto } from './create-feedback-document.dto';

export class FeedbackPublicDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @MaxLength(255)
  code: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  event_id: number;

  @IsEnumValue(EStatus)
  @IsNotEmpty()
  status: EStatus;

  @IsNotEmpty()
  @IsISO8601()
  @UtcToTimezone()
  started_at: Date;

  @IsNotEmpty()
  @IsISO8601()
  @UtcToTimezone()
  ended_at: Date;
}

// --------------------------------------------------------------------------------

export class CreateFeedbackDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  event_id: number;

  @IsNotEmpty()
  @IsEnumValue(EStatus)
  @Transform(({ value }) => parseInt(value))
  status: EStatus;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(365)
  feedback_days_before: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(365)
  feedback_expire_days: number;

  @IsNotEmpty()
  @IsISO8601()
  @StartOf('minute')
  feedback_send_at: Date;

  @IsNotEmpty()
  @IsISO8601()
  @EndOf('minute')
  feedback_expire_at: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateFeedbackDocumentDto)
  feedback_documents: CreateFeedbackDocumentDto[];

  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFormQuestionDto)
  form_questions: CreateFormQuestionDto[];
}
