import { IsNotEmpty, IsNumber } from 'class-validator';

import { CreateAnswerDto } from './create-answer.dto';

export class AnswerDto extends CreateAnswerDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
