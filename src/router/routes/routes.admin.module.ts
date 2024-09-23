import { EventAdminController } from '@modules/event/controllers/event.admin.controller';
import { EventGuestAdminController } from '@modules/event/controllers/event-guest.admin.controller';
import { EventModule } from '@modules/event/event.module';
import { FeedbackAdminController } from '@modules/feedback/controllers/feedback.admin.controller';
import { FeedbackModule } from '@modules/feedback/feedback.module';
import { LogAdminController } from '@modules/log/controllers/log.admin.controller';
import { LogModule } from '@modules/log/log.module';
import { NewsAdminController } from '@modules/news/controllers/news.admin.controller';
import { NewsModule } from '@modules/news/news.module';
import { PermissionAdminController } from '@modules/permission/controllers/permission.admin.controller';
import { PermissionModule } from '@modules/permission/permission.module';
import { ReminderModule } from '@modules/reminder/reminder.module';
import { RoleAdminController } from '@modules/role/controllers/role.admin.controller';
import { RoleModule } from '@modules/role/role.module';
import { SurveyAdminController } from '@modules/survey/controllers/survey.admin.controller';
import { SurveyModule } from '@modules/survey/survey.module';
import { SystemAdminController } from '@modules/system/controllers/system.admin.controller';
import { SystemModule } from '@modules/system/system.module';
import { UserAdminController } from '@modules/user/controllers/user.admin.controller';
import { UserModule } from '@modules/user/user.module';
import { ZaloMessageAdminController } from '@modules/zalo/controllers/zalo-message.admin.controller';
import { ZaloModule } from '@modules/zalo/zalo.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [
    PermissionAdminController,
    RoleAdminController,
    SystemAdminController,
    UserAdminController,
    LogAdminController,
    NewsAdminController,
    EventAdminController,
    EventGuestAdminController,
    FeedbackAdminController,
    SurveyAdminController,
    ZaloMessageAdminController,
  ],
  providers: [],
  exports: [],
  imports: [
    RoleModule,
    PermissionModule,
    UserModule,
    SystemModule,
    LogModule,
    NewsModule,
    EventModule,
    ReminderModule,
    FeedbackModule,
    SurveyModule,
    ZaloModule,
  ],
})
export class RoutesAdminModule {}
