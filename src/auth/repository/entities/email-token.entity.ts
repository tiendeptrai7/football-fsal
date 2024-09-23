import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class EmailToken extends BaseEntity {
  @Column()
  user_id: string;

  @Column()
  email: string;

  @Column()
  token: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  token_expires_at: Date;

  @Column('timestamp', { nullable: true })
  verified_at: Date;

  @Column('smallint', { default: EStatus.active })
  status: EStatus;
}
