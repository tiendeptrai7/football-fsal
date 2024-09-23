import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Event } from './entities/event.entity';
import { EventRepository } from './repositories/event.repository';
import { EventGuestRepository } from './repositories/event-guest.repository';

@Module({
  providers: [
    EventRepository,
    EventGuestRepository,
  ],
  exports: [
    EventRepository,
    EventGuestRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Event,
    ]),
  ],
})
export class EventRepositoryModule {}
