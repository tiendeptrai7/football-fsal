import { AuthUser } from '@auth/types/auth.type';
import { ListPaginate } from '@common/database/types/database.type';
import { FilterNewsDto } from '../dtos/filter-news.dto';
import { News } from '../repository/entities/news.entity';
import { NewsService } from '../services/news.service';
export declare class NewsPublicController {
    private readonly service;
    constructor(service: NewsService);
    getList(param: FilterNewsDto): Promise<ListPaginate<News>>;
    getById(id: number, user: AuthUser): Promise<News>;
}
