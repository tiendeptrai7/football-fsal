import { EFormType } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { Feedback } from '@modules/feedback/repository/entities/feedback.entity';
import { Question } from '@modules/question/repository/entities/question.entity';
import { Survey } from '@modules/survey/repository/entities/survey.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { Submission } from './submission.entity';

@Entity()
export class FormQuestion extends BaseEntity {
  @Column()
  @ApiProperty()
  order: number;

  @Column('smallint')
  @ApiProperty({ enum: EFormType })
  form_type: EFormType;

  @ApiProperty()
  @Column()
  form_id: number;

  @Column()
  @ApiProperty()
  question_id: number;

  @ManyToOne(() => Question, (q) => q.form_questions)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @OneToMany(() => Submission, (submission) => submission.form_question)
  submissions: Submission[];

  @ManyToOne(() => Feedback, (q) => q.form_questions, {
    createForeignKeyConstraints: false,
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'form_id' })
  feedback: Feedback;

  @ManyToOne(() => Survey, (q) => q.form_questions, {
    createForeignKeyConstraints: false,
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'form_id' })
  survey: Survey;
}
