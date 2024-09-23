import { EStatus } from '@app/constant/app.enum';
import { BaseFilterParamDto } from '@common/database/dtos/base-filter.dto';
import {
  EndOf,
  StartOf,
} from '@common/request/decorators/date/request.utc-to-timezone.decorator';
import { IsEnumValue } from '@common/request/validations/request.enum-value.validation';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class FilterZaloMessageDto extends OmitType(BaseFilterParamDto, [
  'date_from',
  'date_to',
]) {
  @ApiProperty({ enum: EStatus, required: false })
  @IsOptional()
  @IsEnumValue(EStatus)
  @Transform(({ value }) => parseInt(value))
  activities: EStatus;

  @IsOptional()
  @IsString()
  observe_by: string;

  @IsOptional()
  @IsString()
  message_type: string;

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
