import { FilterNewsDto } from '@modules/news/dtos/filter-news.dto';
import { DataSource, Repository } from 'typeorm';
import { News } from '../entities/news.entity';
export declare class NewsRepository extends Repository<News> {
    constructor(dataSource: DataSource);
    getList(params: FilterNewsDto, isPublic?: boolean): Promise<[News[], number]>;
    increaseViews(newsId: number): Promise<void>;
}
