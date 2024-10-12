import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreateFutsalTeamDto } from './create.dto';

export class UpdateFutsalTeamDto extends PartialType(CreateFutsalTeamDto) {
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  id: number;
}
