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
exports.NewsView = void 0;
const openapi = require("@nestjs/swagger");
const base_entity_1 = require("../../../../common/database/entities/base.entity");
const user_entity_1 = require("../../../user/repository/entities/user.entity");
const typeorm_1 = require("typeorm");
const news_entity_1 = require("./news.entity");
let NewsView = class NewsView extends base_entity_1.BaseEntity {
    news;
    news_id;
    user;
    user_id;
    static _OPENAPI_METADATA_FACTORY() {
        return { news: { required: true, type: () => Object }, news_id: { required: true, type: () => Number }, user: { required: true, type: () => Object }, user_id: { required: true, type: () => String } };
    }
};
exports.NewsView = NewsView;
__decorate([
    (0, typeorm_1.ManyToOne)(() => news_entity_1.News),
    (0, typeorm_1.JoinColumn)({ name: 'news_id' }),
    __metadata("design:type", Event)
], NewsView.prototype, "news", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], NewsView.prototype, "news_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Event)
], NewsView.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NewsView.prototype, "user_id", void 0);
exports.NewsView = NewsView = __decorate([
    (0, typeorm_1.Entity)()
], NewsView);
//# sourceMappingURL=news-view.entity.js.map