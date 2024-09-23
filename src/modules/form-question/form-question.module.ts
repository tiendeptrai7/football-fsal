import { QuestionRepositoryModule } from '@modules/question/repository/question.repository.module';
import { Module } from '@nestjs/common';

import { FormQuestionRepositoryModule } from './repository/form-question.repository.module';
import { SubmissionRepository } from './repository/repositories/submission.repository';
import { FormQuestionService } from './services/form-question.service';

@Module({
  imports: [FormQuestionRepositoryModule, QuestionRepositoryModule],
  providers: [FormQuestionService, SubmissionRepository],
  exports: [FormQuestionService, SubmissionRepository],
  controllers: [],
})
export class FormQuestionModule {}
