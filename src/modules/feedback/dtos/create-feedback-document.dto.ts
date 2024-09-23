import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFeedbackDocumentDto {
  @IsNotEmpty()
  @IsString()
  url: string;
}
