import { EEventStatus, EStatus } from '@app/constant/app.enum';
import { BaseFilterParamDto } from '@common/database/dtos/base-filter.dto';
import {
  EndOf,
  StartOf,
} from '@common/request/decorators/date/request.utc-to-timezone.decorator';
import { IsEnumValue } from '@common/request/validations/request.enum-value.validation';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsISO8601, IsOptional } from 'class-validator';

export class FilterEventDto extends OmitType(BaseFilterParamDto, [
  'date_from',
  'date_to',
]) {
  @IsOptional()
  @IsEnumValue(EStatus)
  @ApiProperty({ enum: EStatus, required: false })
  @Transform(({ value }) => parseInt(value))
  is_public: EStatus;

  @IsOptional()
  @IsEnumValue(EEventStatus)
  @ApiProperty({ enum: EEventStatus, required: false })
  @Transform(({ value }) => parseInt(value))
  event_status: EEventStatus;

  @IsOptional()
  @IsISO8601()
  @StartOf('day')
  @ApiProperty({ required: false })
  date_from: Date;

  @IsOptional()
  @IsISO8601()
  @EndOf('day')
  @ApiProperty({ required: false })
  date_to: Date;
}

export class FilterEventRelatedHcp {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  hcp_id: number;
}
