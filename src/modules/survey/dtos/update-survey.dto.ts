import { UpdateFormQuestionDto$ } from '@modules/form-question/dtos/update-form-question.dto';
import { OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

import { CreateSurveyFormDto } from './create-survey.dto';

export class UpdateSurveyFormDto extends OmitType(
  PartialType(CreateSurveyFormDto),
  ['form_questions'],
) {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateFormQuestionDto$)
  form_questions: UpdateFormQuestionDto$[];
}
