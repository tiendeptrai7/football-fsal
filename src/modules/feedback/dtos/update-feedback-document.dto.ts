import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

import { CreateFeedbackDocumentDto } from './create-feedback-document.dto';

export class UpdateFeedbackDocumentDto$ extends PartialType(
  CreateFeedbackDocumentDto,
) {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  id: number;
}
