import { DataSource, Repository } from 'typeorm';
import { NewsView } from '../entities/news-view.entity';
export declare class NewsViewRepository extends Repository<NewsView> {
    constructor(dataSource: DataSource);
}
