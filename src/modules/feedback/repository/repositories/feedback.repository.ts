import { EFormType, EStatus } from '@app/constant/app.enum';
import {
  applyQueryPaging,
  applyQueryPeriod,
  applyQuerySorting,
} from '@common/database/helper/query.helper';
import { FilterFeedbackDto } from '@modules/feedback/dtos/filter-feedback.dto';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Feedback } from '../entities/feedback.entity';

@Injectable()
export class FeedbackRepository extends Repository<Feedback> {
  constructor(dataSource: DataSource) {
    super(Feedback, dataSource.createEntityManager());
  }

  // search: code, name; filter: status, feedback_send_at, event_id;
  async getList(params: FilterFeedbackDto): Promise<[Feedback[], number]> {
    const query = this.createQueryBuilder('feedback').leftJoinAndSelect(
      'feedback.event',
      'event',
    );

    if (!isNaN(params?.status)) {
      query.andWhere('feedback.status =:status', { status: params.status });
    }

    if (params?.filter) {
      query.andWhere(
        `feedback.name LIKE N'%' + :filter + '%' OR feedback.code LIKE N'%' + :filter + '%'`,
        {
          filter: params.filter,
        },
      );
    }

    applyQueryPeriod(params, query, {
      alias: 'feedback',
      column: 'feedback_send_at',
    });
    applyQuerySorting(params.sorting, query, 'feedback');
    applyQueryPaging(params, query);

    return await query.getManyAndCount();
  }

  async getByUser(user_id: string): Promise<Feedback[]> {
    return await this.createQueryBuilder('feedback')
      .leftJoin('feedback.event', 'event')
      .leftJoin('event.event_guest', 'event_guest')
      .leftJoin('event_guest.hcp', 'hcp')
      .leftJoin('hcp.user', 'user')
      .leftJoin('event_guest.submissions', 'submission')
      .where('user.id =:user_id AND feedback.status =:status', {
        user_id,
        status: EStatus.active,
      })
      .getMany();
  }

  async getFormQuestion(user_id: string, id: number): Promise<Feedback> {
    const query = this.createQueryBuilder('feedback')
      .leftJoinAndSelect(
        'feedback.form_questions',
        'form_question',
        'feedback.id = form_question.form_id',
      )
      .leftJoin('feedback.event', 'event')
      .leftJoin('event.event_guest', 'event_guest')
      .leftJoin('event_guest.hcp', 'hcp')
      .leftJoin('hcp.user', 'user')
      .leftJoin('form_question.question', 'question')
      .leftJoin(
        'form_question.submissions',
        'submission',
        'submission.event_guest_id = event_guest.id',
      )
      .leftJoin('submission.submission_answers', 'submission_answer')
      .leftJoin('question.answers', 'answer');

    query.where('user.id =:user_id', {
      user_id,
    });

    if (id) {
      query.andWhere(
        'feedback.id = :id AND feedback.status = :status AND form_question.form_type = :type',
        {
          id,
          status: EStatus.active,
          type: EFormType.feedback,
        },
      );
    }

    query.select([
      'feedback.id',
      'feedback.name',
      'feedback.code',
      'feedback.status',
      'feedback.event_id',
      'form_question.id',
      'form_question.form_type',
      'form_question.question_id',
      'question.id',
      'question.content',
      'question.type',
      'question.is_required',
      'answer.id',
      'answer.content',
      'answer.require_input',
      'submission.id',
      'submission.question_type',
      'submission.question_content',
      'submission.answer_value',
      'submission.answer_text',
      'submission_answer.answer_id',
      'submission_answer.answer_content',
      'submission_answer.answer_text',
    ]);

    return await query.getOne();
  }
}
