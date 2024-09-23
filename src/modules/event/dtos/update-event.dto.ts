import { EStatus } from '@app/constant/app.enum';
import {
  EndOf,
  StartOf,
} from '@common/request/decorators/date/request.utc-to-timezone.decorator';
import { IsEnumValue } from '@common/request/validations/request.enum-value.validation';
import { UpdateReminderDto } from '@modules/reminder/dtos/update-reminder.dto';
import { plainToClass, Transform } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateEventDto {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  id: number;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  name?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  @IsOptional()
  image_url?: string;

  @IsOptional()
  @IsISO8601()
  @StartOf('minute')
  started_at?: Date;

  @IsOptional()
  @IsISO8601()
  @EndOf('minute')
  ended_at?: Date;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(365)
  @Transform(({ value }) => parseInt(value))
  invite_days_before?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(365)
  @Transform(({ value }) => parseInt(value))
  invite_expire_days?: number;

  @IsOptional()
  @IsISO8601()
  @StartOf('minute')
  invite_send_at?: Date;

  @IsOptional()
  @IsISO8601()
  @EndOf('minute')
  invite_expire_at?: Date;

  @IsOptional()
  @IsEnumValue(EStatus)
  @Transform(({ value }) => parseInt(value))
  is_public?: EStatus;

  @IsOptional()
  @IsEnumValue(EStatus)
  @Transform(({ value }) => parseInt(value))
  status?: EStatus;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) =>
    plainToClass(UpdateReminderDto, value as UpdateReminderDto[]),
  )
  reminders?: UpdateReminderDto[];
}
