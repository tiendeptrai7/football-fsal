import { ListPaginate } from '@common/database/types/database.type';
import { CreateNewsDto } from '../dtos/create-news.dto';
import { FilterNewsDto } from '../dtos/filter-news.dto';
import { UpdateNewsDto } from '../dtos/update-news.dto';
import { News } from '../repository/entities/news.entity';
import { NewsService } from '../services/news.service';
export declare class NewsAdminController {
    private readonly service;
    constructor(service: NewsService);
    getList(param: FilterNewsDto): Promise<ListPaginate<News>>;
    create(body: CreateNewsDto): Promise<void>;
    update(body: UpdateNewsDto): Promise<void>;
    getById(id: number): Promise<News>;
    toggle(id: number): Promise<void>;
}
