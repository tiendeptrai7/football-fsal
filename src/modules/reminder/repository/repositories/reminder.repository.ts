import {
  applyQueryPaging,
  applyQuerySorting,
} from '@common/database/helper/query.helper';
import { endOfDay, startOfDay } from '@common/utils/date.util';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { FilterReminderDto } from '../../dtos/filter-reminder.dto';
import { Reminder } from '../entities/reminder.entity';

@Injectable()
export class ReminderRepository extends Repository<Reminder> {
  constructor(dataSource: DataSource) {
    super(Reminder, dataSource.createEntityManager());
  }

  async getList(params: FilterReminderDto): Promise<[Reminder[], number]> {
    const query = this.createQueryBuilder('reminder').leftJoinAndSelect(
      'reminder.event',
      'event',
    );

    if (params?.filter) {
      query.andWhere('reminder.name = :filter OR reminder.code = :filter', {
        filter: `%\\${params.filter}%`,
      });
    }

    if (!isNaN(params?.status)) {
      query.andWhere('reminder.status = :status', {
        status: params.status,
      });
    }

    if (params?.reminder_sent_at) {
      const from = startOfDay(params.reminder_sent_at);
      const to = endOfDay(params.reminder_sent_at);

      query.andWhere('reminder.reminder_sent_at BETWEEN :from AND :to', {
        from,
        to,
      });
    }

    applyQuerySorting(params.sorting, query, 'reminder');
    applyQueryPaging(params, query);

    return await query.getManyAndCount();
  }
}
