import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class ObserveMessageDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  comment: string;

  @ArrayNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  message_ids: number[];
}
