import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { CreateEventFormDto } from './create-event-form.dto';

export class UpdateEventFormDto extends CreateEventFormDto {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  id: number;
}
