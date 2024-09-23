import { Module } from '@nestjs/common';

import { NewsRepositoryModule } from './repository/news.repository.module';
import { NewsService } from './services/news.service';

@Module({
  imports: [NewsRepositoryModule],
  exports: [NewsService],
  providers: [NewsService],
  controllers: [],
})
export class NewsModule {}
