import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reminder } from './entities/reminder.entity';
import { ReminderRepository } from './repositories/reminder.repository';
import { ReminderHistoryRepository } from './repositories/reminder-history.repository';

@Module({
  providers: [ReminderRepository, ReminderHistoryRepository],
  exports: [ReminderRepository, ReminderHistoryRepository],
  imports: [TypeOrmModule.forFeature([Reminder])],
})
export class ReminderRepositoryModule {}
