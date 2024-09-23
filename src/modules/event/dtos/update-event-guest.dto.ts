import { EReplyStatus } from '@app/constant/app.enum';
import { IsEnumValue } from '@common/request/validations/request.enum-value.validation';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateInvitationDto {
  @IsNotEmpty()
  @IsString()
  qr_code: string;

  @IsNotEmpty()
  @IsEnumValue(EReplyStatus)
  @Transform(({ value }) => parseInt(value))
  reply_status: EReplyStatus;
}
