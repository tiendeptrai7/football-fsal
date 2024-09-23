import CustomError from '@common/error/exceptions/custom-error.exception';
import { MessageService } from '@common/message/services/message.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

import { FeedbackDocument } from '../repository/entities/feedback-document.entity';
import { FeedbackDocumentRepository } from '../repository/repositories/feedback-document.repository';

@Injectable()
export class FeedbackDocumentService {
  private feedbackDocumentMessage: MessageService;

  constructor(
    i18nService: I18nService,
    private readonly feedbackDocumentRepository: FeedbackDocumentRepository,
  ) {
    this.feedbackDocumentMessage = new MessageService(
      i18nService,
      'feedback-document',
    );
  }

  async getById(id: number): Promise<FeedbackDocument> {
    const feedbackDocument = await this.feedbackDocumentRepository.findOneBy({
      id,
    });

    if (!feedbackDocument)
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        'NOT_FOUND',
        this.feedbackDocumentMessage.get('NOT_FOUND'),
      );

    return feedbackDocument;
  }
}
