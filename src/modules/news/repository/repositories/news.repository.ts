import { EStatus } from '@app/constant/app.enum';
import {
  applyQueryPaging,
  applyQueryPeriod,
  applyQuerySorting,
} from '@common/database/helper/query.helper';
import { FilterNewsDto } from '@modules/news/dtos/filter-news.dto';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { News } from '../entities/news.entity';

@Injectable()
export class NewsRepository extends Repository<News> {
  constructor(dataSource: DataSource) {
    super(News, dataSource.createEntityManager());
  }

  async getList(
    params: FilterNewsDto,
    isPublic = false,
  ): Promise<[News[], number]> {
    const query = this.createQueryBuilder('news');

    if (params?.filter) {
      query.andWhere(
        `news.title LIKE N'%' + :filter + '%' OR news.code LIKE N'%' + :filter + '%'`,
        {
          filter: params.filter,
        },
      );
    }

    if (!isNaN(params?.status)) {
      if (params?.status === EStatus.inactive)
        query.andWhere(`news.status = :status`, {
          status: EStatus.inactive,
        });
      else if (params?.status === EStatus.active)
        query.andWhere(
          `news.status = :status AND news.published_at <= GETDATE()`,
          {
            status: EStatus.active,
          },
        );
      else {
        query.andWhere(
          `news.status = :status AND news.published_at > GETDATE()`,
          {
            status: EStatus.active,
          },
        );
      }
    }

    if (isPublic) {
      query.andWhere(
        'news.status =:status AND news.published_at <= GETDATE()',
        {
          status: EStatus.active,
        },
      );
    }

    applyQueryPeriod(params, query, {
      alias: 'news',
      column: 'published_at',
    });
    applyQuerySorting(params.sorting, query, 'news');
    applyQueryPaging(params, query);

    return await query.getManyAndCount();
  }

  public async increaseViews(newsId: number): Promise<void> {
    const query = this.createQueryBuilder()
      .update(News)
      .set({
        view: () => `view + 1`,
      })
      .where('id =:newsId', {
        newsId,
      });

    await query.execute();
  }
}
