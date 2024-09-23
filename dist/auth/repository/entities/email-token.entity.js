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
exports.EmailToken = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../app/constant/app.enum");
const base_entity_1 = require("../../../common/database/entities/base.entity");
const typeorm_1 = require("typeorm");
let EmailToken = class EmailToken extends base_entity_1.BaseEntity {
    user_id;
    email;
    token;
    token_expires_at;
    verified_at;
    status;
    static _OPENAPI_METADATA_FACTORY() {
        return { user_id: { required: true, type: () => String }, email: { required: true, type: () => String }, token: { required: true, type: () => String }, token_expires_at: { required: true, type: () => Date }, verified_at: { required: true, type: () => Date }, status: { required: true, enum: require("../../../app/constant/app.enum").EStatus } };
    }
};
exports.EmailToken = EmailToken;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmailToken.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmailToken.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmailToken.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], EmailToken.prototype, "token_expires_at", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { nullable: true }),
    __metadata("design:type", Date)
], EmailToken.prototype, "verified_at", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { default: app_enum_1.EStatus.active }),
    __metadata("design:type", Number)
], EmailToken.prototype, "status", void 0);
exports.EmailToken = EmailToken = __decorate([
    (0, typeorm_1.Entity)()
], EmailToken);
//# sourceMappingURL=email-token.entity.js.map