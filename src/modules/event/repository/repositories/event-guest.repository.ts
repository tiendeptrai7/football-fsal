import { EFormType, EStatus } from '@app/constant/app.enum';
import {
  applyQueryPaging,
  applyQuerySorting,
} from '@common/database/helper/query.helper';
import { FilterEventGuestDto } from '@modules/event/dtos/filter-event-guest.dto';
import { ReportSurveyUserDto } from '@modules/survey/dtos/chart-report.dto';
import { FilterParticipantDto } from '@modules/survey/dtos/participant-report-filter.dto';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { EventGuest } from '../entities/event-guest.entity';

@Injectable()
export class EventGuestRepository extends Repository<EventGuest> {
  constructor(dataSource: DataSource) {
    super(EventGuest, dataSource.createEntityManager());
  }

  async getList(params: FilterEventGuestDto): Promise<[EventGuest[], number]> {
    const query = this.createQueryBuilder('event_guest')
      .leftJoinAndSelect('event_guest.hcp', 'hcp')
      .leftJoinAndSelect('hcp.user', 'user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('hcp.medrep', 'medrep')
      .leftJoinAndSelect('event_guest.ref', 'ref')
      .leftJoinAndSelect('ref.hcp', 'hcpRef');

    if (params?.event_id) {
      query.andWhere('event_guest.event_id =:event_id', {
        event_id: params.event_id,
      });
    }
    if (params?.filter) {
      query.andWhere(
        "(hcp.code LIKE N'%' + :filter + '%' OR event_guest.qr_code LIKE N'%' + :filter + '%' OR hcp.name LIKE N'%' + :filter + '%' OR profile.phone LIKE N'%' + :filter + '%')",
        {
          filter: params.filter,
        },
      );
    }
    if (params?.med_rep_code) {
      query.andWhere('medrep.code = :medrep_code', {
        medrep_code: params.med_rep_code,
      });
    }

    if (!isNaN(params?.type)) {
      query.andWhere('hcp.type =:type', { type: params.type });
    }

    if (!isNaN(params?.check_in_status)) {
      if (params?.check_in_status) {
        query.andWhere('event_guest.checked_in_at IS NOT NULL');
      } else {
        query.andWhere('event_guest.checked_in_at IS NULL');
      }
    }

    applyQuerySorting(params.sorting, query, 'event_guest');
    applyQueryPaging(params, query);

    return await query.getManyAndCount();
  }

  async getByUser(user_id: string): Promise<EventGuest> {
    return await this.createQueryBuilder('event_guest')
      .leftJoin('event_guest.hcp', 'hcp')
      .leftJoin('hcp.user', 'user')
      .select(['event_guest', 'user.id', 'user.username'])
      .where('user.id =:user_id', { user_id })
      .getOne();
  }

  async getByForm(
    form_id: number,
    form_type: EFormType,
    user_id: string,
  ): Promise<EventGuest> {
    const query = this.createQueryBuilder('event_guest')
      .leftJoin('event_guest.hcp', 'hcp')
      .leftJoin('hcp.user', 'user')
      .leftJoin('event_guest.event', 'event')
      .select(['event_guest'])
      .where('user.id =:user_id', { user_id });

    if (form_type == EFormType.survey) {
      query.leftJoin('event.surveys', 'surveys');
      query.andWhere('surveys.id =:form_id', { form_id });
    }

    if (form_type == EFormType.feedback) {
      query.leftJoin('event.feedbacks', 'feedbacks');
      query.andWhere('feedbacks.id =:form_id', { form_id });
    }

    return query.getOne();
  }

  async getListParticipantReport(
    params: FilterParticipantDto,
  ): Promise<[EventGuest[], number]> {
    const query = this.createQueryBuilder('event_guest')
      .leftJoinAndSelect('event_guest.hcp', 'hcp')
      .leftJoinAndSelect('event_guest.event', 'event')
      .leftJoinAndSelect(
        'event.surveys',
        'surveys',
        'surveys.id = :survey_id',
        {
          survey_id: params.survey_id,
        },
      )
      .leftJoinAndSelect('event_guest.submissions', 'submissions')
      .leftJoinAndSelect('submissions.form_question', 'form_question')
      .andWhere('surveys.id IS NOT NULL');

    if (!isNaN(params?.status)) {
      const submissionCondition =
        params.status === EStatus.active
          ? 'submissions.id IS NOT NULL'
          : 'submissions.id IS NULL';
      query.andWhere(submissionCondition);
    }

    if (params?.filter) {
      query.andWhere('hcp.name LIKE :filter', { filter: `%${params.filter}%` });
    }

    applyQuerySorting(params.sorting, query, 'event_guest');
    applyQueryPaging(params, query);

    return await query.getManyAndCount();
  }

  async getSurveyReportByUser(
    param: ReportSurveyUserDto,
    id: number,
  ): Promise<EventGuest> {
    const query = this.createQueryBuilder('event_guest')
      .leftJoinAndSelect('event_guest.hcp', 'hcp')
      .leftJoinAndSelect('event_guest.event', 'event')
      .leftJoinAndSelect(
        'event.surveys',
        'surveys',
        'surveys.id = :survey_id',
        {
          survey_id: id,
        },
      )
      .leftJoinAndSelect(
        'event_guest.submissions',
        'submissions',
        'submissions.form_question IS NOT NULL',
      )
      .leftJoinAndSelect(
        'submissions.form_question',
        'form_question',
        'form_question.form_id = :id',
        {
          id,
        },
      )
      .leftJoinAndSelect('submissions.submission_answers', 'submission_answers')
      .andWhere('surveys.id IS NOT NULL');

    if (param.event_guest_id) {
      query.andWhere('event_guest.id =:event_guest_id', {
        event_guest_id: param.event_guest_id,
      });
    }

    return await query.getOne();
  }

  async getTicket(codeOrId: string | number): Promise<EventGuest> {
    const query = this.createQueryBuilder('event_guest')
      .leftJoin('event_guest.event', 'event')
      .leftJoin('event_guest.hcp', 'hcp')
      .leftJoin('event_guest.introduced_guests', 'introduced_guests');

    if (!isNaN(+codeOrId)) {
      query.andWhere('event_guest.id =:id', { id: +codeOrId });
    } else {
      query.andWhere('event_guest.qr_code = :code', { code: codeOrId });
    }

    query.select([
      'event_guest',
      'event.id',
      'event.name',
      'event.status',
      'hcp',
      'introduced_guests',
    ]);

    return await query.getOne();
  }
}
