import {
  applyQueryPaging,
  applyQueryPeriod,
  applyQuerySorting,
} from '@common/database/helper/query.helper';
import { FilterZaloMessageDto } from '@modules/zalo/dtos/filter-zalo-message.dto';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ZaloMessage } from '../entities/zalo-message.entity';

@Injectable()
export class ZaloMessageRepository extends Repository<ZaloMessage> {
  constructor(dataSource: DataSource) {
    super(ZaloMessage, dataSource.createEntityManager());
  }

  async getZaloOAMessages(
    params: FilterZaloMessageDto,
    isExport: boolean = false,
  ): Promise<[ZaloMessage[], number]> {
    const query = this.createQueryBuilder('zalo_message')
      .leftJoinAndSelect('zalo_message.observer', 'observer')
      .leftJoinAndSelect('observer.profile', 'profile');

    if (params.filter)
      query.andWhere(
        `zalo_message.from_display_name LIKE N'%' + :filter + '%' OR zalo_message.to_display_name LIKE N'%' + :filter`,
        {
          filter: params.filter,
        },
      );

    if (!isNaN(params?.activities))
      if (params.activities) query.andWhere('zalo_message.from_id IS NULL');
      else query.andWhere('zalo_message.from_id IS NOT NULL');

    if (params.observe_by)
      query.andWhere('zalo_message.observe_by = :observe_by', {
        observe_by: params.observe_by,
      });

    if (params.message_type)
      query.andWhere('zalo_message.event_name LIKE :message_type', {
        message_type: `%${params.message_type}`,
      });

    applyQueryPeriod(params, query, {
      alias: 'zalo_message',
      column: 'timestamp',
    });
    applyQuerySorting(params.sorting, query, 'zalo_message');
    applyQueryPaging(params, query, isExport);

    return await query.getManyAndCount();
  }

  async getObserverList(): Promise<
    { observer_id: string; observer_name: string }[]
  > {
    const observers = await this.createQueryBuilder('zalo_message')
      .leftJoin('zalo_message.observer', 'observer')
      .leftJoin('observer.profile', 'profile')
      .where('zalo_message.observe_by IS NOT NULL')
      .select([
        'zalo_message.observe_by AS observe_by',
        'MAX(observer.id) AS observer_id',
        'MAX(profile.full_name) AS full_name',
      ])
      .groupBy('zalo_message.observe_by')
      .getRawMany();

    return observers.map((observer) => ({
      observer_id: observer.observe_by,
      observer_name: observer.full_name,
    }));
  }
}
