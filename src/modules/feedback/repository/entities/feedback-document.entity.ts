import { BaseEntity } from '@common/database/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Feedback } from './feedback.entity';

@Entity()
export class FeedbackDocument extends BaseEntity {
  @Column()
  @ApiProperty()
  url: string;

  @Column()
  @ApiProperty()
  feedback_id: number;

  @ManyToOne(() => Feedback, (fb) => fb.feedback_documents, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'feedback_id' })
  feedback: Feedback;
}
