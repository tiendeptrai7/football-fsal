import { INCREMENT_CODE } from '@app/constant/app.constant';
import { EStatus } from '@app/constant/app.enum';
import { AuthUser } from '@auth/types/auth.type';
import { CacheService } from '@common/cache/services/cache.service';
import { ListPaginate } from '@common/database/types/database.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { MessageService } from '@common/message/services/message.service';
import { wrapPagination } from '@common/utils/object.util';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { I18nService } from 'nestjs-i18n';

import { CreateNewsDto } from '../dtos/create-news.dto';
import { FilterNewsDto } from '../dtos/filter-news.dto';
import { UpdateNewsDto } from '../dtos/update-news.dto';
import { News } from '../repository/entities/news.entity';
import { NewsRepository } from '../repository/repositories/news.repository';
import { NewsViewRepository } from '../repository/repositories/news-view.repository';
import { FootballStandingsDto } from '../dtos/standing.dto';
import { ScorersResponseDto } from '../dtos/top-scorer.dto';

@Injectable()
export class NewsService {
  private newsMessage: MessageService;
  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly newsViewRepository: NewsViewRepository,
    i18nService: I18nService,
    private readonly cacheService: CacheService,
  ) {
    this.newsMessage = new MessageService(i18nService, 'news');
  }
  async adminGetList(params: FilterNewsDto): Promise<ListPaginate<News>> {
    const [data, count] = await this.newsRepository.getList(params);

    return wrapPagination<News>(data, count, params);
  }

  async getList(params: FilterNewsDto): Promise<ListPaginate<News>> {
    const [data, count] = await this.newsRepository.getList(params, true);

    return wrapPagination<News>(data, count, params);
  }

  async getById(id: number): Promise<News> {
    const app = await this.newsRepository.findOneBy({ id });
    if (!app) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.newsMessage.get('NOT_FOUND'),
      );
    }
    return app;
  }

  async userGetById(id: number, loggedUser?: AuthUser): Promise<News> {
    const app = await this.newsRepository.findOneBy({ id });
    if (!app) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.newsMessage.get('NOT_FOUND'),
      );
    }

    await this._recordView(id, loggedUser);

    return app;
  }

  async create(input: CreateNewsDto): Promise<void> {
    const code = await this._getINCRCode();
    await this.newsRepository.save({
      code,
      ...input,
    });
  }

  async update(input: UpdateNewsDto): Promise<void> {
    const app = await this.getById(input.id);

    Object.assign(app, { ...input });

    await this.newsRepository.save(app);
  }

  async toggle(id: number): Promise<void> {
    const news = await this.getById(id);

    const status = news.status ? EStatus.inactive : EStatus.active;

    await this.newsRepository.update({ id }, { status });
  }

  private async _recordView(newsId: number, loggedUser?: AuthUser) {
    if (!loggedUser) return;
    const hasViewed = await this.newsViewRepository.findOne({
      where: { news_id: newsId, user_id: loggedUser.id },
    });
    if (!hasViewed) {
      await this.newsViewRepository.save({
        news_id: newsId,
        user_id: loggedUser.id,
      });
      await this.newsRepository.increaseViews(newsId);
    }
  }

  async _getINCRCode(): Promise<string> {
    const getLastCode = async () => {
      const lastRecord = await this.newsRepository.findOne({
        where: {},
        order: {
          id: 'DESC',
        },
      });

      return lastRecord?.code || '';
    };

    const identifier = `${dayjs().format('YYYY_MM')}`;

    return this.cacheService.generateCodeINCR(
      INCREMENT_CODE.NEWS,
      'NE',
      identifier,
      getLastCode,
    );
  }

  // 
  async getStandings(): Promise<FootballStandingsDto> {
    const data = await fetch('https://api.football-data.org//v4/competitions/PL/standings', {
      method: 'GET',
      headers: {
        'X-Auth-Token': process.env.API_FOOTBALL_TOKEN
      }
    })
    return data.json();
  }

  async getScorers(): Promise<ScorersResponseDto> {
    const data = await fetch('https://api.football-data.org//v4/competitions/PL/scorers', {
      method: 'GET',
      headers: {
        'X-Auth-Token': process.env.API_FOOTBALL_TOKEN
      }
    })
    return data.json();
  }
}
