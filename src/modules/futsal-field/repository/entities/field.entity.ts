import {
  Entity,
  Column,
  OneToMany,
} from 'typeorm';
import { Booking } from './booking.entity';
import { Review } from './review.entity';
import { FieldImage } from './field-image.entity';
import { TimeSlot } from './time-slot.entity';
import { BaseEntity } from '@common/database/entities/base.entity';

@Entity('field')
export class Field extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price_per_hour: number;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @OneToMany(() => Booking, (booking) => booking.field)
  bookings: Booking[];

  @OneToMany(() => Review, (review) => review.field)
  reviews: Review[];

  @OneToMany(() => FieldImage, (image) => image.field)
  images: FieldImage[];

  @OneToMany(() => TimeSlot, (slot) => slot.field)
  timeSlots: TimeSlot[];
}
