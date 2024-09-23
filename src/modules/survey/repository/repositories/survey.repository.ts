import { EFormType } from '@app/constant/app.enum';
import { BaseFilterParamDto } from '@common/database/dtos/base-filter.dto';
import {
  applyQueryPaging,
  applyQueryPeriod,
  applyQuerySorting,
} from '@common/database/helper/query.helper';
import { FilterSurveyDto } from '@modules/survey/dtos/filter-survey.dto';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Survey } from '../entities/survey.entity';

@Injectable()
export class SurveyRepository extends Repository<Survey> {
  constructor(dataSource: DataSource) {
    super(Survey, dataSource.createEntityManager());
  }

  async getList(params: FilterSurveyDto): Promise<[Survey[], number]> {
    const query = this.createQueryBuilder('survey');
    query.leftJoin('survey.event', 'event');

    if (!isNaN(params?.status)) {
      query.andWhere('survey.status =:status', { status: params.status });
    }

    if (params?.filter) {
      query.andWhere(
        `survey.name LIKE N'%' + :filter + '%' OR survey.code LIKE N'%' + :filter + '%'`,
        {
          filter: params.filter,
        },
      );
    }

    query.select(['survey', 'event.name', 'event.id']);

    applyQueryPeriod(params, query, {
      alias: 'survey',
      column: 'created_at',
    });
    applyQuerySorting(params.sorting, query, 'survey');
    applyQueryPaging(params, query);

    return await query.getManyAndCount();
  }

  async getListReport(params: BaseFilterParamDto): Promise<[Survey[], number]> {
    const query = this.createQueryBuilder('survey');
    query.leftJoin('survey.event', 'event');
    query.leftJoin('event.event_guest', 'event_guest');

    if (!isNaN(params?.status)) {
      query.andWhere('survey.status =:status', { status: params.status });
    }

    if (params?.filter) {
      query.andWhere(
        `survey.name LIKE N'%' + :filter + '%' OR survey.code LIKE N'%' + :filter`,
        {
          filter: params.filter,
        },
      );
    }

    query.select(['survey', 'event.name', 'event.id', 'event_guest.id']);

    applyQueryPeriod(params, query, {
      alias: 'survey',
      column: 'created_at',
    });
    applyQuerySorting(params.sorting, query, 'survey');
    applyQueryPaging(params, query);

    return await query.getManyAndCount();
  }

  async getOverviewReport(id: number): Promise<Survey> {
    const query = this.createQueryBuilder('survey');
    query.leftJoinAndSelect('survey.event', 'event');
    query.leftJoinAndSelect('event.event_guest', 'event_guest');
    query.leftJoinAndSelect('event_guest.submissions', 'submissions');
    query.leftJoinAndSelect('submissions.form_question', 'form_question');

    query.where('survey.id = :id', { id });

    return await query.getOne();
  }

  async getDetailReport(id: number): Promise<Survey> {
    const query = this.createQueryBuilder('survey');
    query.leftJoinAndSelect(
      'survey.form_questions',
      'form_question',
      'survey.id = form_question.form_id',
    );
    query.leftJoinAndSelect('form_question.question', 'question');
    query.where('survey.id = :id', { id });
    return await query.getOne();
  }

  async getByUser(user_id: string): Promise<Survey[]> {
    return await this.createQueryBuilder('survey')
      .leftJoin('survey.event', 'event')
      .leftJoin('event.event_guest', 'event_guest')
      .leftJoin('event_guest.hcp', 'hcp')
      .leftJoin('hcp.user', 'user')
      .leftJoin('event_guest.submissions', 'submission')
      .where('user.id =:user_id', { user_id })
      .andWhere(
        'survey.started_at <= GETDATE() AND survey.ended_at >= GETDATE()',
      )
      .getMany();
  }

  async getFormQuestion(user_id: string, id: number): Promise<Survey> {
    const query = this.createQueryBuilder('survey')
      .leftJoinAndSelect(
        'survey.form_questions',
        'form_question',
        'survey.id = form_question.form_id',
      )
      .leftJoin('survey.event', 'event')
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
      query.where('survey.id = :id AND form_question.form_type = :type', {
        id,
        type: EFormType.survey,
      });
    }

    query.select([
      'survey.id',
      'survey.name',
      'survey.code',
      'survey.status',
      'survey.event_id',
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

  async getById(id: number): Promise<Survey> {
    const query = this.createQueryBuilder('survey')
      .leftJoin(
        'survey.form_questions',
        'form_question',
        'survey.id = form_question.form_id',
      )
      .leftJoin('form_question.question', 'question')
      .leftJoin('question.answers', 'answer')
      .where('survey.id = :id', {
        id,
        type: EFormType.survey,
      });

    query.select([
      'survey.name',
      'survey.status',
      'survey.event_id',
      'survey.started_at',
      'survey.ended_at',

      'form_question.form_type',
      'form_question.question_id',
    ]);

    return await query.getOne();
  }
}
