import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Feedback } from './entities/feedback.entity';
import { FeedbackDocument } from './entities/feedback-document.entity';
import { FeedbackRepository } from './repositories/feedback.repository';
import { FeedbackDocumentRepository } from './repositories/feedback-document.repository';

@Module({
  providers: [FeedbackRepository, FeedbackDocumentRepository],
  exports: [FeedbackRepository, FeedbackDocumentRepository],
  imports: [TypeOrmModule.forFeature([Feedback, FeedbackDocument])],
})
export class FeedbackRepositoryModule {}
