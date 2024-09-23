import { AuthUser } from '@auth/types/auth.type';
import { CacheService } from '@common/cache/services/cache.service';
import { ListPaginate } from '@common/database/types/database.type';
import { I18nService } from 'nestjs-i18n';
import { CreateNewsDto } from '../dtos/create-news.dto';
import { FilterNewsDto } from '../dtos/filter-news.dto';
import { UpdateNewsDto } from '../dtos/update-news.dto';
import { News } from '../repository/entities/news.entity';
import { NewsRepository } from '../repository/repositories/news.repository';
import { NewsViewRepository } from '../repository/repositories/news-view.repository';
export declare class NewsService {
    private readonly newsRepository;
    private readonly newsViewRepository;
    private readonly cacheService;
    private newsMessage;
    constructor(newsRepository: NewsRepository, newsViewRepository: NewsViewRepository, i18nService: I18nService, cacheService: CacheService);
    adminGetList(params: FilterNewsDto): Promise<ListPaginate<News>>;
    getList(params: FilterNewsDto): Promise<ListPaginate<News>>;
    getById(id: number): Promise<News>;
    userGetById(id: number, loggedUser?: AuthUser): Promise<News>;
    create(input: CreateNewsDto): Promise<void>;
    update(input: UpdateNewsDto): Promise<void>;
    toggle(id: number): Promise<void>;
    private _recordView;
    _getINCRCode(): Promise<string>;
}
