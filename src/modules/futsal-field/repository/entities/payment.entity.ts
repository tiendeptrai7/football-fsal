import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Booking } from './booking.entity';
import { BaseEntity } from '@common/database/entities/base.entity';

@Entity('payment')
export class Payment extends BaseEntity {
  @OneToOne(() => Booking, (booking) => booking.payment)
  @JoinColumn()
  booking: Booking;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 50 })
  payment_method: string;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @CreateDateColumn()
  payment_date: Date;
}
