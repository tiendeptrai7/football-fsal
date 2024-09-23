"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const email_token_entity_1 = require("./entities/email-token.entity");
const token_entity_1 = require("./entities/token.entity");
const email_token_repository_1 = require("./repositories/email-token.repository");
const token_repository_1 = require("./repositories/token.repository");
let TokenRepositoryModule = class TokenRepositoryModule {
};
exports.TokenRepositoryModule = TokenRepositoryModule;
exports.TokenRepositoryModule = TokenRepositoryModule = __decorate([
    (0, common_1.Module)({
        providers: [token_repository_1.TokenRepository, email_token_repository_1.EmailTokenRepository],
        exports: [token_repository_1.TokenRepository, email_token_repository_1.EmailTokenRepository],
        imports: [typeorm_1.TypeOrmModule.forFeature([token_entity_1.Token, email_token_entity_1.EmailToken])],
    })
], TokenRepositoryModule);
//# sourceMappingURL=token.repository.module.js.map