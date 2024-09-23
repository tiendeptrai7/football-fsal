import { EEventStatus, EStatus } from '@app/constant/app.enum';
import {
  applyQueryPaging,
  applyQueryPeriod,
  applyQuerySorting,
} from '@common/database/helper/query.helper';
import {
  FilterEventDto,
  FilterEventRelatedHcp,
} from '@modules/event/dtos/filter-event.dto';
import { EventRelatedHCPResponse } from '@modules/event/interfaces/event-response.interface';
import { FilterReminderPublicDto } from '@modules/reminder/dtos/filter-reminder.dto';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Event } from '../entities/event.entity';

@Injectable()
export class EventRepository extends Repository<Event> {
  constructor(dataSource: DataSource) {
    super(Event, dataSource.createEntityManager());
  }

  // get: created_at, code, name, started_at, ended_at, content, invite_send_at, invite_expire_at, reminders time, status, is_public
  // search: name, code. filter: started_at, is_public
  async getList(
    params: FilterEventDto,
    isPublic = false,
  ): Promise<[Event[], number]> {
    const query = this.createQueryBuilder('event');

    if (!isPublic) {
      query.leftJoinAndSelect('event.reminders', 'reminders');
    }

    if (params?.filter) {
      query.andWhere(
        "event.name LIKE N'%' + :filter + '%' OR event.code LIKE N'%' + :filter + '%'",
        {
          filter: params.filter,
        },
      );
    }

    if (isPublic) {
      query.andWhere('event.is_public = :status AND event.status = :status', {
        status: EStatus.active,
      });
      if (params?.event_status === EEventStatus.inprogress) {
        query.andWhere(
          'event.started_at <= GETDATE() AND event.ended_at >= GETDATE()',
        );
      }
      if (params?.event_status === EEventStatus.upcoming) {
        query.andWhere('event.started_at > GETDATE()');
      }
      if (params?.event_status === EEventStatus.expired) {
        query.andWhere('event.ended_at < GETDATE()');
      }
    }

    if (!isNaN(params?.is_public)) {
      query.andWhere('event.is_public =:is_public', {
        is_public: params.is_public,
      });
    }

    applyQueryPeriod(params, query, {
      alias: 'event',
      column: 'started_at',
    });
    applyQuerySorting(params.sorting, query, 'event');
    applyQueryPaging(params, query);

    return await query.getManyAndCount();
  }

  async getListEventRelatedHCP(
    params: FilterEventRelatedHcp,
  ): Promise<EventRelatedHCPResponse[]> {
    const query = this.createQueryBuilder('event')
      .leftJoin('event.event_guest', 'event_guest')
      .select([
        'event.id as id',
        'event.name as name',
        'MIN(event_guest.checked_in_at) as checked_in_at',
      ])
      .groupBy('event.id')
      .addGroupBy('event.name')
      .having('COUNT(event_guest.event_id) > 0');

    if (params?.hcp_id)
      query.andWhere('event_guest.hcp_id = :hcp_id', {
        hcp_id: params.hcp_id,
      });

    return await query.getRawMany();
  }

  async getListReminderHistory(
    params: FilterReminderPublicDto,
    user_id: string,
  ): Promise<[Event[], number]> {
    const query = this.createQueryBuilder('event');
    query.leftJoinAndSelect('event.reminders', 'reminders');
    query.leftJoinAndSelect(
      'reminders.reminder_histories',
      'reminder_histories',
    );
    query.leftJoin('reminder_histories.event_guest', 'event_guest');
    query.leftJoin('event_guest.hcp', 'hcp');
    query.leftJoin('hcp.user', 'user');

    if (user_id) {
      query.where('user.id =:user_id', { user_id });
      query.andWhere('event.is_public = :status AND event.status = :status', {
        status: EStatus.active,
      });
    }

    if (params?.filter) {
      query.andWhere(
        "event.name LIKE N'%' + :filter + '%' OR event.code LIKE N'%' + :filter + '%'",
        {
          filter: params.filter,
        },
      );
    }

    if (!isNaN(params?.status)) {
      query.andWhere('event.status =:status', { status: params.status });
    }

    if (!isNaN(params?.reply_status)) {
      query.andWhere('reminder_histories.reply_status =:status', {
        status: params.reply_status,
      });
    }

    return await query.getManyAndCount();
  }
}
