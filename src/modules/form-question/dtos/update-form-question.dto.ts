import { UpdateQuestionDto$ } from '@modules/question/dtos/update-question.dto';
import { OmitType, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

import { CreateFormQuestionDto } from './create-form-question.dto';

export class UpdateFormQuestionDto$ extends OmitType(
  PartialType(CreateFormQuestionDto),
  ['question'],
) {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  id: number;

  @IsOptional()
  @Type(() => UpdateQuestionDto$)
  question: UpdateQuestionDto$;
}
