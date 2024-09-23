import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { Feedback } from '@modules/feedback/repository/entities/feedback.entity';
import { Reminder } from '@modules/reminder/repository/entities/reminder.entity';
import { Survey } from '@modules/survey/repository/entities/survey.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';

import { EventGuest } from './event-guest.entity';

@Entity()
export class Event extends BaseEntity {
  @Column({ length: 200 })
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column('ntext')
  @ApiProperty()
  content: string;

  @Column()
  @ApiProperty()
  image_url: string;

  @Column({ length: 2000, nullable: true })
  @ApiProperty()
  location: string;

  @Column()
  @ApiProperty()
  started_at: Date;

  @Column()
  @ApiProperty()
  ended_at: Date;

  @Column({ nullable: true })
  @ApiProperty()
  invite_days_before: number;

  @Column({ nullable: true })
  @ApiProperty()
  invite_expire_days: number;

  @Column()
  @ApiProperty()
  invite_send_at: Date;

  @Column()
  @ApiProperty()
  invite_expire_at: Date;

  @Column('tinyint', { default: EStatus.active })
  @ApiProperty({ enum: EStatus })
  is_public: EStatus;

  @Column({ nullable: true })
  @ApiProperty()
  publish_at: Date;

  @Column('tinyint', { default: EStatus.active })
  @ApiProperty({ enum: EStatus })
  status: EStatus;

  @OneToMany(() => EventGuest, (evq) => evq.event)
  event_guest: EventGuest[];

  @OneToMany(() => Reminder, (reminder) => reminder.event)
  reminders: Reminder[];

  @OneToMany(() => Feedback, (feedback) => feedback.event)
  feedbacks: Feedback[];

  @OneToMany(() => Survey, (survey) => survey.event)
  surveys: Survey[];

  @Column({ nullable: true })
  event_form_id: number;
}
