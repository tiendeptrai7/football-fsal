import { EZaloEventTypes } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { User } from '@modules/user/repository/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class ZaloMessage extends BaseEntity {
  //form
  @Index()
  @Column({ nullable: true })
  from_id: string;

  @Column({ nullable: true })
  from_display_name: string;

  @Column({ nullable: true })
  from_avatar: string;

  //TO
  @Index()
  @Column({ nullable: true })
  to_id: string;

  @Column({ nullable: true })
  to_display_name: string;

  @Column({ nullable: true })
  to_avatar: string;

  //info
  @Column({ nullable: true })
  event_name: EZaloEventTypes;

  @Index()
  @Column()
  message_id: string;

  @Column({ nullable: true })
  quote_message_id: string;

  @Column({ nullable: true, length: 4000 })
  message: string;

  @Index()
  @Column({
    nullable: true,
    type: 'bigint',
    transformer: {
      from: (value: string) => Number(value),
      to: (value: bigint) => value,
    },
  })
  timestamp: number;

  @Column({
    type: 'text',
    nullable: true,
    transformer: {
      to(value: any): any {
        if (Object.prototype.toString.call(value) === '[object Array]') {
          return JSON.stringify(value);
        }

        return value;
      },
      from(value: any): any {
        try {
          if (isFinite(value)) return [value];
          return JSON.parse(value);
        } catch (e) {
          return value ? [value] : [];
        }
      },
    },
  })
  attachments: string;

  @Column({ nullable: true, length: 1000 })
  @ApiProperty()
  comment: string;

  @Column({ nullable: true })
  @ApiProperty()
  observe_by: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'observe_by' })
  observer: User;
}
