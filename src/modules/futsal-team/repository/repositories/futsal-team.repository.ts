import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { FutsalTeam } from '../entities/futsal-team.entity';
import { FilterFutsalTeamDto } from '@modules/futsal-team/dtos/filter.dto';
import {
  applyQueryPaging,
  applyQueryPeriod,
  applyQuerySorting,
} from '@common/database/helper/query.helper';

@Injectable()
export class FutsalTeamRepository extends Repository<FutsalTeam> {
  constructor(dataSource: DataSource) {
    super(FutsalTeam, dataSource.createEntityManager());
  }

  async getList(params: FilterFutsalTeamDto): Promise<[FutsalTeam[], number]> {
    const query = this.createQueryBuilder('futsal_team');

    if (params?.filter) {
      query.andWhere(
        `futsal_team.id LIKE N'%' + :filter + '%' OR futsal_team.name LIKE N'%' + :filter + '%'`,
        {
          filter: params.filter,
        },
      );
    }

    if (!isNaN(params?.status)) {
      query.andWhere(`futsal_team.status = :status`, {
        status: params.status,
      });
    }

    applyQueryPeriod(params, query, {
      alias: 'futsal_team',
      column: 'published_at',
    });
    applyQuerySorting(params.sorting, query, 'futsal_team');
    applyQueryPaging(params, query);

    return await query.getManyAndCount();
  }
}
