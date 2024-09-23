import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { Event } from '@modules/event/repository/entities/event.entity';
import { FormQuestion } from '@modules/form-question/repository/entities/form-question.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { FeedbackDocument } from './feedback-document.entity';

@Entity()
export class Feedback extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  @ApiProperty()
  code: string;

  @Column({ nullable: true })
  @ApiProperty()
  feedback_days_before: number;

  @Column({ nullable: true })
  @ApiProperty()
  feedback_expire_days: number;

  @Column()
  @ApiProperty()
  feedback_send_at: Date;

  @Column()
  @ApiProperty()
  feedback_expire_at: Date;

  @Column('smallint', { default: EStatus.active })
  @ApiProperty({ enum: EStatus })
  status: EStatus;

  @Column()
  @ApiProperty()
  event_id: number;

  @ManyToOne(() => Event, (event) => event.feedbacks)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @OneToMany(
    () => FeedbackDocument,
    (feedbackDocument) => feedbackDocument.feedback,
    { cascade: true },
  )
  feedback_documents: FeedbackDocument[];

  @OneToMany(() => FormQuestion, (formQuestion) => formQuestion.feedback, {
    cascade: true,
  })
  form_questions: FormQuestion[];
}
