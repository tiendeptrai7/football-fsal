import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

import { CreateAnswerDto } from './create-answer.dto';

export class UpdateAnswerDto extends CreateAnswerDto {}

// ------------------------------------------------------

export class UpdateAnswerDto$ extends PartialType(CreateAnswerDto) {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  id: number;
}
