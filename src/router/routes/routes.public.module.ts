import { EventPublicController } from '@modules/event/controllers/event.public.controller';
import { EventGuestPublicController } from '@modules/event/controllers/event-guest.public.controller';
import { EventModule } from '@modules/event/event.module';
import { FeedbackPublicController } from '@modules/feedback/controllers/feedback.public.controller';
import { FeedbackModule } from '@modules/feedback/feedback.module';
import { NewsPublicController } from '@modules/news/controllers/news.public.controller';
import { NewsModule } from '@modules/news/news.module';
import { PermissionModule } from '@modules/permission/permission.module';
import { ReminderPublicController } from '@modules/reminder/controllers/reminder.public.controller';
import { ReminderModule } from '@modules/reminder/reminder.module';
import { SurveyPublicController } from '@modules/survey/controllers/survey.public.controller';
import { SurveyModule } from '@modules/survey/survey.module';
import { SystemPublicController } from '@modules/system/controllers/system.public.controller';
import { SystemModule } from '@modules/system/system.module';
import { UserPublicController } from '@modules/user/controllers/user.public.controller';
import { UserModule } from '@modules/user/user.module';
import { ZaloHookPublicController } from '@modules/zalo/controllers/zalo-hook.public.controller';
import { ZaloModule } from '@modules/zalo/zalo.module';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthPublicController } from 'src/health/controllers/health.public.controller';

@Module({
  controllers: [
    HealthPublicController,
    SystemPublicController,
    UserPublicController,
    FeedbackPublicController,
    NewsPublicController,
    EventPublicController,
    EventGuestPublicController,
    ReminderPublicController,
    SurveyPublicController,
    ZaloHookPublicController,
  ],
  providers: [],
  exports: [],
  imports: [
    TerminusModule,
    SystemModule,
    UserModule,
    PermissionModule,
    ReminderModule,
    FeedbackModule,
    NewsModule,
    SurveyModule,
    EventModule,
    ZaloModule,
  ],
})
export class RoutesPublicModule {}
