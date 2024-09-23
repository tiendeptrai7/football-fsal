import { EStatus } from '@app/constant/app.enum';
import {
  EndOf,
  StartOf,
} from '@common/request/decorators/date/request.utc-to-timezone.decorator';
import { IsEnumValue } from '@common/request/validations/request.enum-value.validation';
import { CreateReminderDto } from '@modules/reminder/dtos/create-reminder.dto';
import { plainToClass, Transform } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  name: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  image_url: string;

  @IsNotEmpty()
  @IsISO8601()
  @StartOf('minute')
  started_at: Date;

  @IsNotEmpty()
  @IsISO8601()
  @EndOf('minute')
  ended_at: Date;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(365)
  @Transform(({ value }) => parseInt(value))
  invite_days_before: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(365)
  @Transform(({ value }) => parseInt(value))
  invite_expire_days: number;

  @IsNotEmpty()
  @IsISO8601()
  @StartOf('minute')
  invite_send_at: Date;

  @IsNotEmpty()
  @IsISO8601()
  @EndOf('minute')
  invite_expire_at: Date;

  @IsNotEmpty()
  @IsEnumValue(EStatus)
  @Transform(({ value }) => parseInt(value))
  is_public: EStatus;

  @IsNotEmpty()
  @IsEnumValue(EStatus)
  @Transform(({ value }) => parseInt(value))
  status: EStatus;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) =>
    plainToClass(CreateReminderDto, value as CreateReminderDto[]),
  )
  reminders: CreateReminderDto[];
}

export class CheckInDto {
  @IsNotEmpty()
  @IsString()
  qr_code: string;
}
