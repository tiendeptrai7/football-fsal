import {
  Entity,
  Column,
  ManyToOne,
} from 'typeorm';
import { Field } from './field.entity';
import { User } from '@modules/user/repository/entities/user.entity';
import { BaseEntity } from '@common/database/entities/base.entity';

@Entity('review')
export class Review extends BaseEntity {
  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Field, (field) => field.reviews)
  field: Field;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text' })
  comment: string;
}
