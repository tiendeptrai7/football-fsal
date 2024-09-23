import { BaseEntity } from '@common/database/entities/base.entity';
export declare class NewsView extends BaseEntity {
    news: Event;
    news_id: number;
    user: Event;
    user_id: string;
}
