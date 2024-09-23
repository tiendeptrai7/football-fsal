import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { FeedbackDocument } from '../entities/feedback-document.entity';

@Injectable()
export class FeedbackDocumentRepository extends Repository<FeedbackDocument> {
  constructor(dataSource: DataSource) {
    super(FeedbackDocument, dataSource.createEntityManager());
  }

  async getByUser(
    user_id: string,
    feedback_id: number,
  ): Promise<FeedbackDocument[]> {
    return await this.createQueryBuilder('feedback-document')
      .leftJoin('feedback-document.feedback', 'feedback')
      .leftJoin('feedback.event', 'event')
      .leftJoin('event.event_guest', 'event_guest')
      .leftJoin('event_guest.hcp', 'hcp')
      .leftJoin('hcp.user', 'user')
      .where(
        'user.id =:user_id AND feedback-document.feedback_id = :feedback_id',
        {
          user_id,
          feedback_id,
        },
      )
      .getMany();
  }
}
