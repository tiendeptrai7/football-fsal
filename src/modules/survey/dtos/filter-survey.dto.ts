import { BaseFilterParamDto } from '@common/database/dtos/base-filter.dto';
import {
  EndOf,
  StartOf,
} from '@common/request/decorators/date/request.utc-to-timezone.decorator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsISO8601, IsOptional } from 'class-validator';

export class FilterSurveyDto extends OmitType(BaseFilterParamDto, [
  'date_from',
  'date_to',
]) {
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
