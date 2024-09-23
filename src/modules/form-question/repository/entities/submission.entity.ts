import { EQuestionType } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { EventGuest } from '@modules/event/repository/entities/event-guest.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { FormQuestion } from './form-question.entity';
import { SubmissionAnswer } from './submission-answer.entity';

@Entity()
export class Submission extends BaseEntity {
  @Column('smallint')
  @ApiProperty({ enum: EQuestionType })
  question_type: EQuestionType;

  @Column({ nullable: true })
  @ApiProperty()
  question_content: string;

  @Column({ nullable: true })
  @ApiProperty()
  answer_value: string;

  @Column({ nullable: true })
  @ApiProperty()
  answer_text: string;

  @Column()
  @ApiProperty()
  form_question_id: number;

  @ManyToOne(() => FormQuestion, (form) => form.submissions)
  @JoinColumn({ name: 'form_question_id' })
  form_question: FormQuestion;

  @Column({ nullable: true })
  @ApiProperty()
  event_guest_id: number;

  @ManyToOne(() => EventGuest, (eventGuest) => eventGuest.submissions, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'event_guest_id' })
  event_guest: EventGuest;

  @OneToMany(
    () => SubmissionAnswer,
    (submission_answer) => submission_answer.submission,
    {
      cascade: true,
    },
  )
  submission_answers: SubmissionAnswer[];
}
