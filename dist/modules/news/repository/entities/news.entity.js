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
exports.News = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../../app/constant/app.enum");
const base_entity_1 = require("../../../../common/database/entities/base.entity");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let News = class News extends base_entity_1.BaseEntity {
    title;
    thumbnail;
    code;
    content;
    status;
    published_at;
    view;
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, thumbnail: { required: true, type: () => String }, code: { required: true, type: () => String }, content: { required: true, type: () => String }, status: { required: true, enum: require("../../../../app/constant/app.enum").EStatus }, published_at: { required: true, type: () => Date }, view: { required: true, type: () => Number } };
    }
};
exports.News = News;
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], News.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], News.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], News.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)('ntext'),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], News.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)('smallint', { default: app_enum_1.EStatus.inactive }),
    (0, swagger_1.ApiProperty)({ enum: app_enum_1.EStatus }),
    __metadata("design:type", Number)
], News.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: 'Thời gian publish tin tức' }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], News.prototype, "published_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], News.prototype, "view", void 0);
exports.News = News = __decorate([
    (0, typeorm_1.Entity)()
], News);
//# sourceMappingURL=news.entity.js.map