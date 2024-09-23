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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsRepository = void 0;
const app_enum_1 = require("../../../../app/constant/app.enum");
const query_helper_1 = require("../../../../common/database/helper/query.helper");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const news_entity_1 = require("../entities/news.entity");
let NewsRepository = class NewsRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(news_entity_1.News, dataSource.createEntityManager());
    }
    async getList(params, isPublic = false) {
        const query = this.createQueryBuilder('news');
        if (params?.filter) {
            query.andWhere(`news.title LIKE N'%' + :filter + '%' OR news.code LIKE N'%' + :filter + '%'`, {
                filter: params.filter,
            });
        }
        if (!isNaN(params?.status)) {
            if (params?.status === app_enum_1.EStatus.inactive)
                query.andWhere(`news.status = :status`, {
                    status: app_enum_1.EStatus.inactive,
                });
            else if (params?.status === app_enum_1.EStatus.active)
                query.andWhere(`news.status = :status AND news.published_at <= GETDATE()`, {
                    status: app_enum_1.EStatus.active,
                });
            else {
                query.andWhere(`news.status = :status AND news.published_at > GETDATE()`, {
                    status: app_enum_1.EStatus.active,
                });
            }
        }
        if (isPublic) {
            query.andWhere('news.status =:status AND news.published_at <= GETDATE()', {
                status: app_enum_1.EStatus.active,
            });
        }
        (0, query_helper_1.applyQueryPeriod)(params, query, {
            alias: 'news',
            column: 'published_at',
        });
        (0, query_helper_1.applyQuerySorting)(params.sorting, query, 'news');
        (0, query_helper_1.applyQueryPaging)(params, query);
        return await query.getManyAndCount();
    }
    async increaseViews(newsId) {
        const query = this.createQueryBuilder()
            .update(news_entity_1.News)
            .set({
            view: () => `view + 1`,
        })
            .where('id =:newsId', {
            newsId,
        });
        await query.execute();
    }
};
exports.NewsRepository = NewsRepository;
exports.NewsRepository = NewsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], NewsRepository);
//# sourceMappingURL=news.repository.js.map