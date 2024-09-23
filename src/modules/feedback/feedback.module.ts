import { EventModule } from '@modules/event/event.module';
import { FormQuestionModule } from '@modules/form-question/form-question.module';
import { QuestionModule } from '@modules/question/question.module';
import { Module } from '@nestjs/common';

import { FeedbackRepositoryModule } from './repository/feedback.repository.module';
import { FeedbackPublicService } from './services/feedback.public.service';
import { FeedbackService } from './services/feedback.service';
import { FeedbackDocumentService } from './services/feedback-document.service';

@Module({
  imports: [
    EventModule,
    QuestionModule,
    FormQuestionModule,
    FeedbackRepositoryModule,
  ],
  providers: [FeedbackService, FeedbackDocumentService, FeedbackPublicService],
  exports: [FeedbackService, FeedbackDocumentService, FeedbackPublicService],
  controllers: [],
})
export class FeedbackModule {}
