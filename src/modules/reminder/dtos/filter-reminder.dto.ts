import { EStatus } from '@app/constant/app.enum';
import { BaseFilterParamDto } from '@common/database/dtos/base-filter.dto';
import { IsEnumValue } from '@common/request/validations/request.enum-value.validation';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsISO8601, IsOptional } from 'class-validator';

export class FilterReminderDto extends BaseFilterParamDto {
  @IsOptional()
  @IsISO8601()
  @ApiProperty({ required: false })
  reminder_sent_at: Date;
}

export class FilterReminderPublicDto extends BaseFilterParamDto {
  @ApiProperty({ enum: EStatus, required: false })
  @IsOptional()
  @IsEnumValue(EStatus)
  @Transform(({ value }) => parseInt(value))
  reply_status?: EStatus;
}
