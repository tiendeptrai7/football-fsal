import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { Event } from '@modules/event/repository/entities/event.entity';
import { FormQuestion } from '@modules/form-question/repository/entities/form-question.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Survey extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  code: string;

  @Column('smallint', { default: EStatus.inactive })
  @ApiProperty({ enum: EStatus })
  status: EStatus;

  @Column()
  @ApiProperty()
  event_id: number;

  @Column()
  @ApiProperty()
  started_at: Date;

  @Column()
  @ApiProperty()
  ended_at: Date;

  @ManyToOne(() => Event, (e) => e.surveys)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @OneToMany(() => FormQuestion, (f) => f.survey, {
    cascade: true,
  })
  form_questions: FormQuestion[];
}
