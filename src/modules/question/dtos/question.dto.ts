import { IsNotEmpty, IsNumber } from 'class-validator';

export class QuestionDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
