import { IsNotEmpty, IsNumber } from 'class-validator';

export class CopySurveyDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
