import { EventModule } from '@modules/event/event.module';
import { FormQuestionModule } from '@modules/form-question/form-question.module';
import { QuestionModule } from '@modules/question/question.module';
import { QuestionRepositoryModule } from '@modules/question/repository/question.repository.module';
import { Module } from '@nestjs/common';

import { SurveyRepositoryModule } from './repository/survey.repository.module';
import { SurveyAdminService } from './services/survey.admin.service';
import { SurveyPublicService } from './services/survey.public.service';

@Module({
  imports: [
    QuestionRepositoryModule,
    SurveyRepositoryModule,
    EventModule,
    QuestionModule,
    FormQuestionModule,
  ],
  exports: [
    SurveyAdminService,
    SurveyPublicService,
    SurveyRepositoryModule,
    QuestionRepositoryModule,
    EventModule,
    FormQuestionModule,
  ],
  providers: [SurveyPublicService, SurveyAdminService],
  controllers: [],
})
export class SurveyModule {}
