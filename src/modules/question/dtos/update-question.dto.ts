import { OmitType, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, ValidateNested } from 'class-validator';

import { CreateQuestionDto } from './create-question.dto';
import { UpdateAnswerDto$ } from './update-answer.dto';

export class UpdateQuestionDto extends CreateQuestionDto {}

// -----------------------------------------------------

export class UpdateQuestionDto$ extends OmitType(
  PartialType(CreateQuestionDto),
  ['answers'],
) {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  id: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateAnswerDto$)
  answers: UpdateAnswerDto$[];
}
