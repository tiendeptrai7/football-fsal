import { IsNotEmpty, IsString } from 'class-validator';

export class ChartDto {
  @IsString()
  @IsNotEmpty()
  question_id: string;
}

export class ReportSurveyUserDto {
  @IsString()
  @IsNotEmpty()
  event_guest_id: string;
}
