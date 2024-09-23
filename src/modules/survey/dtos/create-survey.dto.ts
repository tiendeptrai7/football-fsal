import { EStatus } from '@app/constant/app.enum';
import { UtcToTimezone } from '@common/request/decorators/date/request.utc-to-timezone.decorator';
import { IsEnumValue } from '@common/request/validations/request.enum-value.validation';
import { CreateFormQuestionDto } from '@modules/form-question/dtos/create-form-question.dto';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class CreateSurveyFormDto {
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

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateFormQuestionDto)
  form_questions: CreateFormQuestionDto[];
}
