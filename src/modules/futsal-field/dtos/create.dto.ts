import { EStatus } from '@app/constant/app.enum';
import { IsEnumValue } from '@common/request/validations/request.enum-value.validation';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateFutsalTeamDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  thumbnail: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  content: string;

  @IsOptional()
  @IsNumber()
  established_year: number;

  @IsNotEmpty()
  @IsEnumValue(EStatus)
  @Transform(({ value }) => parseInt(value))
  status: EStatus;
}
