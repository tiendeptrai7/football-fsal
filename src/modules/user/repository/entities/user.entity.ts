import { EStatus } from '@app/constant/app.enum';
import { BaseUUIDEntity } from '@common/database/entities/base-uuid.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { Profile } from './profile.entity';
import { UserRole } from './user-role.entity';
import { Booking } from '@modules/futsal-field/repository/entities/booking.entity';
import { Review } from '@modules/futsal-field/repository/entities/review.entity';

@Entity()
export class User extends BaseUUIDEntity {
  @Column({
    nullable: true,
  })
  @ApiProperty()
  email: string;

  @Column({
    unique: true,
  })
  @ApiProperty()
  username: string;

  @Exclude()
  @Column({ select: false })
  @ApiHideProperty()
  password: string;

  @Column('smallint', { default: EStatus.active })
  @ApiProperty({ enum: EStatus })
  status: EStatus;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
  })
  @ApiProperty({ type: () => Profile })
  profile: Profile;

  @OneToMany(() => UserRole, (ur) => ur.user, {
    cascade: true,
    nullable: true,
  })
  @ApiProperty({ type: () => UserRole, isArray: true })
  user_roles: UserRole[];

  @Column('timestamp', { nullable: true })
  @ApiProperty()
  change_password_at: Date;

  @Column('smallint', { default: 0 })
  @ApiProperty()
  login_failed: number;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
