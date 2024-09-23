import { AppZaloEventTypes } from '@app/constant/app.constant';
import { MessageService } from '@common/message/services/message.service';
import { Injectable, Logger } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

import { ZaloMessage } from '../repository/entities/zalo-message.entity';
import { ZaloHookPayload } from '../types/zalo.type';
import { ZaloService } from './zalo.service';

@Injectable()
export class ZaloHookService {
  private zaloMessage: MessageService;
  constructor(
    private readonly logger: Logger,
    i18nService: I18nService,
    private readonly zaloService: ZaloService,
  ) {
    this.zaloMessage = new MessageService(i18nService, 'zalo');
  }

  async processZaloHook(body: ZaloHookPayload): Promise<void> {
    try {
      if (Object.values(AppZaloEventTypes).includes(body.event_name)) {
        await this._recordMessage(body);
      }
    } catch (e) {
      this.logger.error(
        `Error when process zalo hook with payload ${JSON.stringify(body)}`,
        e,
        'ZaloService.processZaloHook',
      );
    }
  }

  async _recordMessage(body: ZaloHookPayload) {
    const { sender, event_name, recipient, message, timestamp } = body;
    const OA = await this.zaloService.getOa();
    const senderDetail =
      OA?.oaid === sender.id
        ? null
        : await this.zaloService.getUserDetail(sender.id);

    const recipientDetail =
      OA?.oaid === recipient.id
        ? null
        : await this.zaloService.getUserDetail(recipient.id);

    // if (!OA || !(senderDetail || recipientDetail)) return;

    const obj = new ZaloMessage();
    obj.from_id = senderDetail?.user_id ?? sender?.id;
    obj.from_avatar = senderDetail?.avatar ?? OA?.avatar ?? null;
    obj.from_display_name = senderDetail?.display_name ?? OA?.name ?? null;
    obj.to_id = recipientDetail?.user_id ?? recipient?.id;
    obj.to_avatar = recipientDetail?.avatar ?? OA?.avatar ?? null;
    obj.to_display_name = recipientDetail?.display_name ?? OA?.name ?? null;
    obj.event_name = event_name;
    obj.attachments = message.attachments
      ? JSON.stringify(message.attachments)
      : null;
    obj.message_id = message.msg_id;
    obj.message = message.text;
    obj.timestamp = +timestamp;
    obj.quote_message_id = message?.quote_msg_id;
    await obj.save();
  }
}
