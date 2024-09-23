import { ECheckInStatus, EHCPType } from '@app/constant/app.enum';
import { BaseFilterParamDto } from '@common/database/dtos/base-filter.dto';
import { IsEnumValue } from '@common/request/validations/request.enum-value.validation';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterEventGuestDto extends BaseFilterParamDto {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  event_id: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  med_rep_code: string;

  @IsOptional()
  @IsEnumValue(EHCPType)
  @ApiProperty({ enum: EHCPType, required: false })
  @Transform(({ value }) => parseInt(value))
  type: EHCPType;

  @IsOptional()
  @IsEnumValue(ECheckInStatus)
  @ApiProperty({ enum: ECheckInStatus, required: false })
  @Transform(({ value }) => parseInt(value))
  check_in_status: ECheckInStatus;
}
