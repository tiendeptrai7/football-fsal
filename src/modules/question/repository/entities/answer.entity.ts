import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { SubmissionAnswer } from '@modules/form-question/repository/entities/submission-answer.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { Question } from './question.entity';

@Entity()
export class Answer extends BaseEntity {
  @Column({ length: 2000 })
  @ApiProperty()
  content: string;

  @Column('smallint', { default: EStatus.inactive })
  @ApiProperty({ enum: EStatus })
  require_input: EStatus;

  @Column()
  @ApiProperty()
  question_id: number;

  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @OneToMany(
    () => SubmissionAnswer,
    (submission_answer) => submission_answer.answer,
  )
  submission_answers: SubmissionAnswer[];
}
