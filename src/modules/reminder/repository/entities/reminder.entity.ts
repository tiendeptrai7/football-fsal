import { BaseEntity } from '@common/database/entities/base.entity';
import { Event } from '@modules/event/repository/entities/event.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ReminderHistory } from './reminder-history.entity';

@Entity()
export class Reminder extends BaseEntity {
  @Column()
  @ApiProperty()
  reminder_days_before: number;

  @Column()
  @ApiProperty()
  reminder_expire_days: number;

  @Column()
  @ApiProperty()
  reminder_sent_at: Date;

  @Column()
  @ApiProperty()
  reminder_expire_at: Date;

  @Column()
  @ApiProperty()
  event_id: number;

  @ManyToOne(() => Event, (event) => event.reminders)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @OneToMany(() => ReminderHistory, (reminder) => reminder.reminder)
  reminder_histories: ReminderHistory[];
}
