import {
  Entity,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Field } from './field.entity';
import { Payment } from './payment.entity';
import { User } from '@modules/user/repository/entities/user.entity';
import { BaseEntity } from '@common/database/entities/base.entity';

@Entity('booking')
export class Booking extends BaseEntity {
  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @ManyToOne(() => Field, (field) => field.bookings)
  field: Field;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'timestamp' })
  end_time: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_price: number;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @OneToOne(() => Payment, (payment) => payment.booking)
  payment: Payment;
}
