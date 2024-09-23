import { EventModule } from '@modules/event/event.module';
import { Module } from '@nestjs/common';

import { ReminderRepositoryModule } from './repository/reminder.repository.module';
import { ReminderService } from './services/reminder.service';

@Module({
  imports: [ReminderRepositoryModule, EventModule],
  exports: [ReminderService],
  providers: [ReminderService],
  controllers: [],
})
export class ReminderModule {}
