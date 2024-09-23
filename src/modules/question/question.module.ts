import { Module } from '@nestjs/common';

import { QuestionRepositoryModule } from './repository/question.repository.module';
import { QuestionService } from './services/question.service';

@Module({
  imports: [QuestionRepositoryModule],
  exports: [QuestionService],
  providers: [QuestionService],
  controllers: [],
})
export class QuestionModule {}
