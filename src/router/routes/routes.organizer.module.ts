import { EventOrganizerController } from '@modules/event/controllers/event.organizer.controller';
import { EventGuestOrganizerController } from '@modules/event/controllers/event-guest.organizer.controller';
import { EventModule } from '@modules/event/event.module';
import { PermissionModule } from '@modules/permission/permission.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [
    EventOrganizerController,
    EventGuestOrganizerController,
  ],
  providers: [],
  exports: [],
  imports: [EventModule, PermissionModule],
})
export class RoutesOrganizerModule {}
