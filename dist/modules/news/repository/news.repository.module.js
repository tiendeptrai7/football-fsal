"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsRepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const news_entity_1 = require("./entities/news.entity");
const news_view_entity_1 = require("./entities/news-view.entity");
const news_repository_1 = require("./repositories/news.repository");
const news_view_repository_1 = require("./repositories/news-view.repository");
let NewsRepositoryModule = class NewsRepositoryModule {
};
exports.NewsRepositoryModule = NewsRepositoryModule;
exports.NewsRepositoryModule = NewsRepositoryModule = __decorate([
    (0, common_1.Module)({
        providers: [news_repository_1.NewsRepository, news_view_repository_1.NewsViewRepository],
        exports: [news_repository_1.NewsRepository, news_view_repository_1.NewsViewRepository],
        imports: [typeorm_1.TypeOrmModule.forFeature([news_entity_1.News, news_view_entity_1.NewsView])],
    })
], NewsRepositoryModule);
//# sourceMappingURL=news.repository.module.js.map