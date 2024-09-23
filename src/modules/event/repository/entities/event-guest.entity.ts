import { EReplyStatus, EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { Submission } from '@modules/form-question/repository/entities/submission.entity';
import { ReminderHistory } from '@modules/reminder/repository/entities/reminder-history.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Event } from './event.entity';

@Entity()
export class EventGuest extends BaseEntity {
  @Column()
  @ApiProperty()
  event_id: number;

  @Column()
  @ApiProperty()
  hcp_id: number;

  @Column({ unique: true })
  @ApiProperty()
  qr_code: string;

  @Column('smallint', { default: EStatus.active })
  @ApiProperty({ enum: EStatus })
  qr_status: EStatus;

  @Column({ nullable: true })
  @ApiProperty()
  invitation_time_at: Date;

  @Column('smallint', { default: EReplyStatus.pending })
  @ApiProperty({ enum: EReplyStatus })
  reply_status: EReplyStatus;

  @Column('smallint', { default: EStatus.inactive })
  @ApiProperty({ enum: EStatus })
  is_eligible: EStatus;

  @ManyToOne(() => Event, (event) => event.event_guest)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @OneToMany(() => Submission, (submission) => submission.event_guest)
  submissions: Submission[];

  @OneToMany(() => ReminderHistory, (reminder) => reminder.event_guest)
  reminders: ReminderHistory[];

  @Column({ nullable: true })
  @ApiProperty()
  checked_in_at: Date;

  //ref
  @Column({ nullable: true })
  ref_id: number;

  @ManyToOne(() => EventGuest, (ev) => ev.introduced_guests)
  @JoinColumn({ name: 'ref_id' })
  ref: EventGuest;

  // List of guests introduced by this guest
  @OneToMany(() => EventGuest, (ev) => ev.ref)
  introduced_guests: EventGuest[];
  //end ref
}
