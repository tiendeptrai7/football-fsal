import { BaseDateEntity } from '@common/database/entities/base-date.entity';
import { Answer } from '@modules/question/repository/entities/answer.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Submission } from './submission.entity';

@Entity()
export class SubmissionAnswer extends BaseDateEntity {
  @PrimaryColumn()
  @ApiProperty()
  submission_id: number;

  @PrimaryColumn()
  @ApiProperty()
  answer_id: number;

  @Column()
  @ApiProperty()
  answer_content: string;

  @Column({ nullable: true })
  @ApiProperty()
  answer_text: string;

  @ManyToOne(() => Submission, (submission) => submission.submission_answers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'submission_id' })
  submission: Submission;

  @ManyToOne(() => Answer, (answer) => answer.submission_answers)
  @JoinColumn({ name: 'answer_id' })
  answer: Answer;
}
