import { EStatus } from '@app/constant/app.enum';
import { StartOf } from '@common/request/decorators/date/request.utc-to-timezone.decorator';
import { IsEnumValue } from '@common/request/validations/request.enum-value.validation';
import { Transform } from 'class-transformer';
import { IsISO8601, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateNewsDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsISO8601()
  @StartOf('minute')
  published_at: Date;

  @IsNotEmpty()
  @IsEnumValue(EStatus)
  @Transform(({ value }) => parseInt(value))
  status: EStatus;

  @IsNotEmpty()
  @IsString()
  thumbnail: string;
}
