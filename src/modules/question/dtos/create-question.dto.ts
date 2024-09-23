import { EQuestionType, EStatus } from '@app/constant/app.enum';
import { IsEnumValue } from '@common/request/validations/request.enum-value.validation';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { CreateAnswerDto } from './create-answer.dto';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsEnumValue(EQuestionType)
  type: EQuestionType;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2000)
  content: string;

  @IsNotEmpty()
  @IsEnumValue(EStatus)
  is_required: EStatus;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[];
}
