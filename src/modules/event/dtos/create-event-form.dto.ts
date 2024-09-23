import {
  EEventFormDetailFormat,
  EEventFormDetailType,
  EStatus,
} from '@app/constant/app.enum';
import { IsEnumValue } from '@common/request/validations/request.enum-value.validation';
import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class CreateEventFormDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2000)
  consent: string;

  @IsNotEmpty()
  @IsEnumValue(EStatus)
  @Transform(({ value }) => parseInt(value))
  status: EStatus;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => EventFormDetailDto)
  event_form_details: EventFormDetailDto[];
}

export class EventFormDetailDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value) || null)
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2000)
  content: string;

  @IsNotEmpty()
  @IsEnumValue(EEventFormDetailType)
  type: EEventFormDetailType;

  @IsNotEmpty()
  @IsEnumValue(EEventFormDetailFormat)
  format: EEventFormDetailFormat;

  @IsNotEmpty()
  @IsEnumValue(EStatus)
  is_required: EStatus;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EventFormOptionDto)
  event_form_options: EventFormOptionDto[];
}

export class EventFormOptionDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value) || null)
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  content: string;

  @IsNotEmpty()
  @IsEnumValue(EStatus)
  @Transform(({ value }) => parseInt(value))
  require_input: EStatus;
}

export class SubmitAccompanyingGuestDto {
  @IsNotEmpty()
  @IsNumber()
  event_guest_id: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => EventRegistrationInfoDto)
  event_registration_info: EventRegistrationInfoDto[];
}

export class EventRegistrationInfoDto {
  @IsNotEmpty()
  @IsNumber()
  event_form_detail_id: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    if (!isNaN(value)) return '' + value;
    return value;
  })
  value: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EventRegistrationOptionDto)
  event_registration_option: EventRegistrationOptionDto[];
}

export class EventRegistrationOptionDto {
  @IsNotEmpty()
  @IsNumber()
  event_form_option_id: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    if (!isNaN(value)) return '' + value;
    return value;
  })
  value: string;

  @IsOptional()
  @IsString()
  content: string;
}
