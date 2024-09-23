import { EFormType } from '@app/constant/app.enum';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Submission } from '../entities/submission.entity';

@Injectable()
export class SubmissionRepository extends Repository<Submission> {
  constructor(dataSource: DataSource) {
    super(Submission, dataSource.createEntityManager());
  }

  async getByUser(
    user_id: string,
    type: EFormType,
    form_id?: number,
  ): Promise<Submission[]> {
    const query = this.createQueryBuilder('submission')
      .leftJoin('submission.event_guest', 'event_guest')
      .leftJoinAndSelect('submission.form_question', 'form_question')
      .leftJoin('event_guest.hcp', 'hcp')
      .leftJoin('hcp.user', 'user');

    query.where('user.id =:user_id AND form_question.form_type =:type', {
      user_id,
      type,
    });

    if (form_id) {
      query.andWhere('form_question.form_id =:form_id', { form_id });
    }
    return await query.getMany();
  }

  async getByEventGuest(
    event_guest_id: number,
    type: EFormType,
    form_id: number,
  ): Promise<Submission[]> {
    const query = this.createQueryBuilder('submission')
      .leftJoin('submission.event_guest', 'event_guest')
      .leftJoin('submission.form_question', 'form_question');

    query.where('event_guest.id =:event_guest_id', {
      event_guest_id,
    });

    if (type) {
      query.andWhere('form_question.form_type =:type', { type });
    }

    if (form_id) {
      query.andWhere('form_question.form_id =:form_id', { form_id });
    }

    query.select(['submission.id', 'submission.form_question']);

    return await query.getMany();
  }
}
