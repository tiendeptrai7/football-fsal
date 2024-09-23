import { QuestionRepositoryModule } from '@modules/question/repository/question.repository.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FormQuestion } from './entities/form-question.entity';
import { FormQuestionRepository } from './repositories/form-question.repository';
import { SubmissionRepository } from './repositories/submission.repository';
import { SubmissionAnswerRepository } from './repositories/submission-answer.repository';
import { ViewMultiChoiceRepository } from './repositories/view-multi-choice.repository';
import { ViewPercentageRepository } from './repositories/view-percentage.repository';
import { ViewRatingRepository } from './repositories/view-rating.repository';
import { ViewSingleChoiceRepository } from './repositories/view-single-choice.repository';
import { ViewTextRepository } from './repositories/view-text.repository';

@Module({
  providers: [
    FormQuestionRepository,
    SubmissionAnswerRepository,
    SubmissionRepository,
    ViewMultiChoiceRepository,
    ViewSingleChoiceRepository,
    ViewTextRepository,
    ViewPercentageRepository,
    ViewRatingRepository,
  ],
  exports: [
    FormQuestionRepository,
    SubmissionAnswerRepository,
    SubmissionRepository,
    ViewMultiChoiceRepository,
    ViewSingleChoiceRepository,
    ViewTextRepository,
    ViewPercentageRepository,
    ViewRatingRepository,
  ],
  imports: [TypeOrmModule.forFeature([FormQuestion]), QuestionRepositoryModule],
})
export class FormQuestionRepositoryModule {}
