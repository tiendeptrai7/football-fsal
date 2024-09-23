import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { News } from './entities/news.entity';
import { NewsView } from './entities/news-view.entity';
import { NewsRepository } from './repositories/news.repository';
import { NewsViewRepository } from './repositories/news-view.repository';

@Module({
  providers: [NewsRepository, NewsViewRepository],
  exports: [NewsRepository, NewsViewRepository],
  imports: [TypeOrmModule.forFeature([News, NewsView])],
})
export class NewsRepositoryModule {}
