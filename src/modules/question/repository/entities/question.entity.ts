import { EQuestionType, EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { FormQuestion } from '@modules/form-question/repository/entities/form-question.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';

import { Answer } from './answer.entity';

@Entity()
export class Question extends BaseEntity {
  @Column({ length: 2000 })
  @ApiProperty()
  content: string;

  @Column('tinyint', { default: EQuestionType.single_choice })
  @ApiProperty({ enum: EQuestionType })
  type: EQuestionType;

  @Column('tinyint', { default: EStatus.active })
  @ApiProperty({ enum: EStatus })
  is_required: EStatus;

  @OneToMany(() => Answer, (answer) => answer.question, { cascade: true })
  answers: Answer[];

  @OneToMany(() => FormQuestion, (fq) => fq.question)
  form_questions: FormQuestion[];
}
