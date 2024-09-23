import { BaseFilterParamDto } from '@common/database/dtos/base-filter.dto';
import {
  EndOf,
  StartOf,
} from '@common/request/decorators/date/request.utc-to-timezone.decorator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsISO8601, IsNumber, IsOptional } from 'class-validator';

export class FilterFeedbackDto extends OmitType(BaseFilterParamDto, [
  'date_from',
  'date_to',
]) {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  event_id: number;

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
