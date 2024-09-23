import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { NewsView } from '../entities/news-view.entity';

@Injectable()
export class NewsViewRepository extends Repository<NewsView> {
  constructor(dataSource: DataSource) {
    super(NewsView, dataSource.createEntityManager());
  }
}
