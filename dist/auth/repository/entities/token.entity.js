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
exports.Token = void 0;
const openapi = require("@nestjs/swagger");
const base_entity_1 = require("../../../common/database/entities/base.entity");
const typeorm_1 = require("typeorm");
let Token = class Token extends base_entity_1.BaseEntity {
    user_id;
    scope;
    access_token;
    access_token_expires_at;
    refresh_token;
    refresh_token_expires_at;
    static _OPENAPI_METADATA_FACTORY() {
        return { user_id: { required: true, type: () => String }, scope: { required: true, type: () => String }, access_token: { required: true, type: () => String }, access_token_expires_at: { required: true, type: () => Date }, refresh_token: { required: true, type: () => String }, refresh_token_expires_at: { required: true, type: () => Date } };
    }
};
exports.Token = Token;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Token.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Token.prototype, "scope", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 1000, nullable: false }),
    __metadata("design:type", String)
], Token.prototype, "access_token", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Token.prototype, "access_token_expires_at", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 1000, nullable: false }),
    __metadata("design:type", String)
], Token.prototype, "refresh_token", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Token.prototype, "refresh_token_expires_at", void 0);
exports.Token = Token = __decorate([
    (0, typeorm_1.Entity)()
], Token);
//# sourceMappingURL=token.entity.js.map