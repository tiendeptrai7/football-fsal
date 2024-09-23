import { FormQuestionRepository } from '@modules/form-question/repository/repositories/form-question.repository';
import { SubmissionRepository } from '@modules/form-question/repository/repositories/submission.repository';
import { ViewMultiChoiceRepository } from '@modules/form-question/repository/repositories/view-multi-choice.repository';
import { ViewPercentageRepository } from '@modules/form-question/repository/repositories/view-percentage.repository';
import { ViewSingleChoiceRepository } from '@modules/form-question/repository/repositories/view-single-choice.repository';
import { ViewTextRepository } from '@modules/form-question/repository/repositories/view-text.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Survey } from './entities/survey.entity';
import { SurveyRepository } from './repositories/survey.repository';

@Module({
  providers: [
    SurveyRepository,
    FormQuestionRepository,
    SubmissionRepository,
    ViewMultiChoiceRepository,
    ViewSingleChoiceRepository,
    ViewTextRepository,
    ViewPercentageRepository,
  ],
  exports: [
    SurveyRepository,
    FormQuestionRepository,
    SubmissionRepository,
    ViewMultiChoiceRepository,
    ViewSingleChoiceRepository,
    ViewTextRepository,
    ViewPercentageRepository,
  ],
  imports: [TypeOrmModule.forFeature([Survey])],
})
export class SurveyRepositoryModule {}
