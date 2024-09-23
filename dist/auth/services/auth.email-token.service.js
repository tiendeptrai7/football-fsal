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
exports.AuthEmailTokenService = void 0;
const app_enum_1 = require("../../app/constant/app.enum");
const custom_error_exception_1 = __importDefault(require("../../common/error/exceptions/custom-error.exception"));
const mail_service_1 = require("../../common/mail/services/mail.service");
const message_service_1 = require("../../common/message/services/message.service");
const date_util_1 = require("../../common/utils/date.util");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const dayjs_1 = __importDefault(require("dayjs"));
const nestjs_i18n_1 = require("nestjs-i18n");
const typeorm_1 = require("typeorm");
const email_token_repository_1 = require("../repository/repositories/email-token.repository");
let AuthEmailTokenService = class AuthEmailTokenService {
    mailService;
    jwtService;
    configService;
    emailTokenRepository;
    messageService;
    constructor(mailService, jwtService, configService, emailTokenRepository, i18nService) {
        this.mailService = mailService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.emailTokenRepository = emailTokenRepository;
        this.messageService = new message_service_1.MessageService(i18nService, 'auth');
    }
    async generateAndSendToken(user) {
        const payload = { email: user.email, user_id: user.id };
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: '1d',
            secret: this.configService.get('auth.jwt.emailTokenSecret'),
        });
        const expiresAt = (0, dayjs_1.default)().add(1, 'd').toDate();
        await this.emailTokenRepository.delete(payload);
        await this.emailTokenRepository.save({
            ...payload,
            token,
            token_expires_at: expiresAt,
        });
        this.mailService.sendResetPassword({
            email: payload.email,
            url: this.configService.get('app.adminUrl'),
            token,
            expires_at: (0, date_util_1.formatDateVN)(expiresAt),
        });
    }
    async verifyToken(token) {
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('auth.jwt.emailTokenSecret'),
                ignoreExpiration: true,
            });
            return await this._verifyTokenPayload(payload);
        }
        catch (e) {
            if (e instanceof jwt_1.TokenExpiredError) {
                this.emailTokenRepository
                    .update({ token }, { status: app_enum_1.EStatus.inactive })
                    .then();
                throw new custom_error_exception_1.default(401, 'UNAUTHORIZED', this.messageService.get('TOKEN_EXPIRED'));
            }
            else {
                throw new custom_error_exception_1.default(401, 'UNAUTHORIZED', this.messageService.get('TOKEN_INVALID'));
            }
        }
    }
    async getVerifiedToken(token) {
        const emailToken = await this.emailTokenRepository.findOneBy({
            token,
            status: app_enum_1.EStatus.active,
            verified_at: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()),
        });
        if (!emailToken) {
            throw new custom_error_exception_1.default(401, 'UNAUTHORIZED', this.messageService.get('TOKEN_INVALID'));
        }
        return emailToken;
    }
    async _verifyTokenPayload(payload) {
        const emailToken = await this.emailTokenRepository.findOneBy({
            user_id: payload.user_id,
            email: payload.email,
            status: app_enum_1.EStatus.active,
        });
        if (!emailToken) {
            throw new custom_error_exception_1.default(401, 'UNAUTHORIZED', this.messageService.get('TOKEN_INVALID'));
        }
        if ((0, dayjs_1.default)().isAfter((0, dayjs_1.default)(emailToken.token_expires_at))) {
            throw new jwt_1.TokenExpiredError('JWT expired', new Date());
        }
        else {
            await this.emailTokenRepository.update(emailToken.id, {
                verified_at: new Date(),
            });
        }
        return emailToken;
    }
};
exports.AuthEmailTokenService = AuthEmailTokenService;
exports.AuthEmailTokenService = AuthEmailTokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mail_service_1.MailService,
        jwt_1.JwtService,
        config_1.ConfigService,
        email_token_repository_1.EmailTokenRepository,
        nestjs_i18n_1.I18nService])
], AuthEmailTokenService);
//# sourceMappingURL=auth.email-token.service.js.map