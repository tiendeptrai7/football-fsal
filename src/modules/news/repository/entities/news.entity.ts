import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity()
export class News extends BaseEntity {
  @Column()
  @ApiProperty()
  title: string;

  @Column({ nullable: true })
  @ApiProperty()
  thumbnail: string;

  @Column()
  @ApiProperty()
  code: string;

  @Column('text')
  @ApiProperty()
  content: string;

  @Column('smallint', { default: EStatus.inactive })
  @ApiProperty({ enum: EStatus })
  status: EStatus;

  @Column({ nullable: true, comment: 'Thời gian publish tin tức' })
  @ApiProperty()
  published_at: Date;

  @Column({ default: 0 })
  view: number;
}
