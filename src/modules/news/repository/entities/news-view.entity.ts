import { BaseEntity } from '@common/database/entities/base.entity';
import { User } from '@modules/user/repository/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { News } from './news.entity';

@Entity()
export class NewsView extends BaseEntity {
  @ManyToOne(() => News)
  @JoinColumn({ name: 'news_id' })
  news: Event;

  @Column()
  news_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: Event;

  @Column()
  user_id: string;
}
