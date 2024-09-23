import { BaseImportDto } from '@common/request/dtos/import.dto';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BaseImportEventGuestDto extends BaseImportDto {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  event_id: number;
}

export class ImportEventGuestDto {
  @IsString()
  @IsNotEmpty()
  hcp_code: string;

  @IsString()
  @IsOptional()
  hcp_name: string;
}
