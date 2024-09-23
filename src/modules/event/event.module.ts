import { ReminderRepositoryModule } from '@modules/reminder/repository/reminder.repository.module';
import { Module } from '@nestjs/common';

import { EventRepositoryModule } from './repository/event.repository.module';
import { EventService } from './services/event.service';
import { EventGuestService } from './services/event-guest.service';

@Module({
  imports: [
    EventRepositoryModule,
    ReminderRepositoryModule,
  ],
  exports: [
    EventService,
    EventGuestService,
    EventRepositoryModule,
  ],
  providers: [
    EventService,
    EventGuestService,
  ],
  controllers: [],
})
export class EventModule {}
