"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsService = void 0;
const app_constant_1 = require("../../../app/constant/app.constant");
const app_enum_1 = require("../../../app/constant/app.enum");
const cache_service_1 = require("../../../common/cache/services/cache.service");
const custom_error_exception_1 = __importDefault(require("../../../common/error/exceptions/custom-error.exception"));
const message_service_1 = require("../../../common/message/services/message.service");
const object_util_1 = require("../../../common/utils/object.util");
const common_1 = require("@nestjs/common");
const dayjs_1 = __importDefault(require("dayjs"));
const nestjs_i18n_1 = require("nestjs-i18n");
const news_repository_1 = require("../repository/repositories/news.repository");
const news_view_repository_1 = require("../repository/repositories/news-view.repository");
let NewsService = class NewsService {
    newsRepository;
    newsViewRepository;
    cacheService;
    newsMessage;
    constructor(newsRepository, newsViewRepository, i18nService, cacheService) {
        this.newsRepository = newsRepository;
        this.newsViewRepository = newsViewRepository;
        this.cacheService = cacheService;
        this.newsMessage = new message_service_1.MessageService(i18nService, 'news');
    }
    async adminGetList(params) {
        const [data, count] = await this.newsRepository.getList(params);
        return (0, object_util_1.wrapPagination)(data, count, params);
    }
    async getList(params) {
        const [data, count] = await this.newsRepository.getList(params, true);
        return (0, object_util_1.wrapPagination)(data, count, params);
    }
    async getById(id) {
        const app = await this.newsRepository.findOneBy({ id });
        if (!app) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.newsMessage.get('NOT_FOUND'));
        }
        return app;
    }
    async userGetById(id, loggedUser) {
        const app = await this.newsRepository.findOneBy({ id });
        if (!app) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.newsMessage.get('NOT_FOUND'));
        }
        await this._recordView(id, loggedUser);
        return app;
    }
    async create(input) {
        const code = await this._getINCRCode();
        await this.newsRepository.save({
            code,
            ...input,
        });
    }
    async update(input) {
        const app = await this.getById(input.id);
        Object.assign(app, { ...input });
        await this.newsRepository.save(app);
    }
    async toggle(id) {
        const news = await this.getById(id);
        const status = news.status ? app_enum_1.EStatus.inactive : app_enum_1.EStatus.active;
        await this.newsRepository.update({ id }, { status });
    }
    async _recordView(newsId, loggedUser) {
        if (!loggedUser)
            return;
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
    async _getINCRCode() {
        const getLastCode = async () => {
            const lastRecord = await this.newsRepository.findOne({
                where: {},
                order: {
                    id: 'DESC',
                },
            });
            return lastRecord?.code || '';
        };
        const identifier = `${(0, dayjs_1.default)().format('YYYY_MM')}`;
        return this.cacheService.generateCodeINCR(app_constant_1.INCREMENT_CODE.NEWS, 'NE', identifier, getLastCode);
    }
};
exports.NewsService = NewsService;
exports.NewsService = NewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [news_repository_1.NewsRepository,
        news_view_repository_1.NewsViewRepository,
        nestjs_i18n_1.I18nService,
        cache_service_1.CacheService])
], NewsService);
//# sourceMappingURL=news.service.js.map