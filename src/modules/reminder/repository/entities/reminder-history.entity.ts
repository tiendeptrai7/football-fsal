import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { EventGuest } from '@modules/event/repository/entities/event-guest.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Reminder } from './reminder.entity';

@Entity()
export class ReminderHistory extends BaseEntity {
  @Column('tinyint', { default: EStatus.inactive })
  @ApiProperty({ enum: EStatus })
  reply_status: EStatus;

  @Column()
  @ApiProperty()
  reminder_id: number;

  @Column('text')
  @ApiProperty()
  content: string;

  @Column()
  @ApiProperty()
  event_guest_id: number;

  @ManyToOne(() => EventGuest, (eq) => eq.reminders)
  @JoinColumn({ name: 'event_guest_id' })
  event_guest: EventGuest;

  @ManyToOne(() => Reminder, (r) => r.reminder_histories)
  @JoinColumn({ name: 'reminder_id' })
  reminder: Reminder;
}
