import {
  EndOf,
  StartOf,
} from '@common/request/decorators/date/request.utc-to-timezone.decorator';
import { Transform } from 'class-transformer';
import {
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class CreateReminderDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(30)
  @Transform(({ value }) => parseInt(value))
  reminder_days_before: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(30)
  @Transform(({ value }) => parseInt(value))
  reminder_expire_days: number;

  @IsNotEmpty()
  @IsISO8601()
  @StartOf('minute')
  reminder_sent_at: Date;

  @IsNotEmpty()
  @IsISO8601()
  @EndOf('minute')
  reminder_expire_at: Date;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  event_id: number;
}
