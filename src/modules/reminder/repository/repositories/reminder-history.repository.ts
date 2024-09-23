import { BaseFilterParamDto } from '@common/database/dtos/base-filter.dto';
import {
  applyQueryPaging,
  applyQuerySorting,
} from '@common/database/helper/query.helper';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ReminderHistory } from '../entities/reminder-history.entity';

@Injectable()
export class ReminderHistoryRepository extends Repository<ReminderHistory> {
  constructor(dataSource: DataSource) {
    super(ReminderHistory, dataSource.createEntityManager());
  }

  async getList(
    params: BaseFilterParamDto,
    user_id?: string,
  ): Promise<[ReminderHistory[], number]> {
    const query = this.createQueryBuilder('reminder_history')
      .leftJoin('reminder_history.event_guest', 'event_guest')
      .leftJoin('event_guest.hcp', 'hcp')
      .leftJoin('hcp.user', 'user');

    if (user_id) {
      query.where('user.id =:user_id', { user_id });
    }

    applyQuerySorting(params.sorting, query, 'reminder_history');
    applyQueryPaging(params, query);

    return await query.getManyAndCount();
  }

  async userGetById(id: number, user_id?: string): Promise<ReminderHistory> {
    const query = this.createQueryBuilder('reminder_history')
      .leftJoin('reminder_history.event_guest', 'event_guest')
      .leftJoin('event_guest.event', 'event')
      .leftJoin('event_guest.hcp', 'hcp')
      .leftJoin('hcp.user', 'user')
      .where('reminder_history.id =:id', { id });

    query.select([
      'reminder_history',
      'event_guest.id',
      'event_guest.event_id',
      'event_guest.qr_status',
      'event_guest.qr_code',
      'event_guest.reply_status',
      'event.name',
      'event.code',
      'event.content',
      'event.location',
      'event.image_url',
      'event.started_at',
      'event.ended_at',
      'event.status',
    ]);

    if (user_id) {
      query.andWhere('user.id =:user_id', { user_id });
    }

    return await query.getOne();
  }
}
