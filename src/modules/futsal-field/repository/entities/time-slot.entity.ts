import {
  Entity,
  Column,
  ManyToOne,
} from 'typeorm';
import { Field } from './field.entity';
import { BaseEntity } from '@common/database/entities/base.entity';

@Entity('time_slot')
export class TimeSlot extends BaseEntity {
  @ManyToOne(() => Field, (field) => field.timeSlots)
  field: Field;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'timestamp' })
  end_time: Date;

  @Column({ type: 'boolean', default: true })
  is_available: boolean;
}
