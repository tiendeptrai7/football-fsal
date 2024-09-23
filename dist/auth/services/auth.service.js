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
exports.AuthService = void 0;
const app_enum_1 = require("../../app/constant/app.enum");
const custom_error_exception_1 = __importDefault(require("../../common/error/exceptions/custom-error.exception"));
const message_service_1 = require("../../common/message/services/message.service");
const string_util_1 = require("../../common/utils/string.util");
const user_repository_1 = require("../../modules/user/repository/repositories/user.repository");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const dayjs_1 = __importDefault(require("dayjs"));
const nestjs_i18n_1 = require("nestjs-i18n");
const auth_enum_1 = require("../constants/auth.enum");
const token_entity_1 = require("../repository/entities/token.entity");
const email_token_repository_1 = require("../repository/repositories/email-token.repository");
const token_repository_1 = require("../repository/repositories/token.repository");
const auth_email_token_service_1 = require("./auth.email-token.service");
const auth_password_service_1 = require("./auth.password.service");
const auth_zalo_service_1 = require("./auth.zalo.service");
let AuthService = class AuthService {
    configService;
    userRepository;
    tokenRepository;
    emailTokenRepository;
    jwtService;
    authPasswordService;
    authZaloService;
    authEmailTokenService;
    messageService;
    constructor(configService, userRepository, tokenRepository, emailTokenRepository, jwtService, authPasswordService, authZaloService, authEmailTokenService, i18nService) {
        this.configService = configService;
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.emailTokenRepository = emailTokenRepository;
        this.jwtService = jwtService;
        this.authPasswordService = authPasswordService;
        this.authZaloService = authZaloService;
        this.authEmailTokenService = authEmailTokenService;
        this.messageService = new message_service_1.MessageService(i18nService, 'auth');
    }
    async authentication(body) {
        this._validateAuthenticate(body);
        let user;
        let isChangePassword = false;
        switch (body.grant_type) {
            case 'password':
                [user, isChangePassword] =
                    await this.authPasswordService.passwordAuthenticate(body.username, body.password);
                break;
            case 'zalo':
                user = await this.authZaloService.zaloAuthenticate(body.access_token);
                break;
        }
        const authUser = this._generateAuthUser(user, body);
        this._checkAdminAccess(authUser);
        authUser.is_change_password = isChangePassword;
        return authUser;
    }
    async verifyToken(userId, authToken, type) {
        const token = await this.tokenRepository.findOneBy({
            user_id: userId,
            [type === auth_enum_1.EAuthType.access ? 'access_token' : 'refresh_token']: authToken,
        });
        if (!token) {
            throw new custom_error_exception_1.default(401, 'UNAUTHORIZED', this.messageService.get('TOKEN_INVALID'));
        }
        const user = await this.userRepository.getUserByCredential(userId, 'id');
        if (!user || user.deleted_at) {
            throw new custom_error_exception_1.default(401, 'UNAUTHORIZED', this.messageService.get('USER_NOT_FOUND'));
        }
        if (user.status === app_enum_1.EStatus.inactive) {
            throw new custom_error_exception_1.default(401, 'ACCOUNT_INACTIVE', this.messageService.get('ACCOUNT_INACTIVE'));
        }
        return {
            id: user.id,
            full_name: user.profile?.full_name,
            username: user.username,
            email: user.email,
            roles: user.user_roles?.map((ur) => ur.role.slug),
            scope: token.scope,
        };
    }
    async token(user) {
        const { token: accessToken, expired: accessTokenExpiresAt } = this._generateToken(user, this.configService.get('auth.jwt.accessSecret'), this.configService.get('auth.jwt.accessLifeTime'));
        const { token: refreshToken, expired: refreshTokenExpiresAt } = this._generateToken(user, this.configService.get('auth.jwt.refreshSecret'), this.configService.get('auth.jwt.refreshLifeTime'));
        const token = new token_entity_1.Token();
        Object.assign(token, {
            user_id: user.id,
            scope: user.scope,
            access_token: accessToken,
            access_token_expires_at: accessTokenExpiresAt,
            refresh_token: refreshToken,
            refresh_token_expires_at: refreshTokenExpiresAt,
        });
        await this.tokenRepository.save(token);
        return {
            accessToken,
            accessTokenExpiresAt,
            refreshToken,
            refreshTokenExpiresAt,
            user: {
                id: user.id,
                scope: user.scope,
                roles: user.roles,
                is_change_password: user.is_change_password,
            },
        };
    }
    async removeToken(token, type) {
        await this.tokenRepository.delete({
            [type === auth_enum_1.EAuthType.access ? 'access_token' : 'refresh_token']: token,
        });
    }
    async forgotPassword(body) {
        const user = await this.userRepository.getUserByCredential(body.email, 'email');
        if (!user) {
            throw new custom_error_exception_1.default(404, 'AUTH_NOT_FOUND', this.messageService.get('USER_NOT_FOUND'));
        }
        await this.authEmailTokenService.generateAndSendToken(user);
    }
    async verifyEmailToken(body) {
        await this.authEmailTokenService.verifyToken(body.token);
    }
    async resetPassword(body) {
        const emailToken = await this.authEmailTokenService.getVerifiedToken(body.token);
        await this.authPasswordService.resetPassword(emailToken.user_id, body.password);
        await this.tokenRepository.delete({ user_id: emailToken.user_id });
        this.emailTokenRepository
            .update({ id: emailToken.id }, { status: app_enum_1.EStatus.inactive })
            .then();
    }
    async changePassword(body, loggedUser) {
        await this.authPasswordService.changePassword(body, loggedUser);
        await this.tokenRepository.delete({ user_id: loggedUser.id });
    }
    async checkAccount(body) {
        const user = await this.userRepository.findOne({
            where: { username: body.username },
            select: ['username', 'password'],
        });
        if (!user) {
            throw new custom_error_exception_1.default(400, 'INVALID_AUTH', this.messageService.get('INVALID_AUTH'));
        }
        if (!(await (0, string_util_1.comparePassword)(body.password, user.password))) {
            throw new custom_error_exception_1.default(400, 'INVALID_AUTH', this.messageService.get('INVALID_AUTH'));
        }
    }
    _generateAuthUser(user, body) {
        return {
            id: user.id,
            full_name: user.profile?.full_name,
            username: user.username,
            email: user.email,
            roles: user.user_roles.map((ur) => ur.role.slug),
            scope: body.scope,
        };
    }
    _checkAdminAccess(authUser) {
        const isStandardUserWithAdminScope = authUser.roles.length === 1 &&
            authUser.roles[0] === 'user_standard' &&
            authUser.scope === 'admin';
        if (isStandardUserWithAdminScope) {
            throw new custom_error_exception_1.default(403, 'FORBIDDEN', this.messageService.get('FORBIDDEN'));
        }
    }
    _generateToken(user, secret, lifetime) {
        const now = (0, dayjs_1.default)().unix();
        const payload = {
            iat: now,
            uid: user.id,
            claims: {
                user_id: user.id,
                username: user.username,
                email: user.email,
            },
        };
        return {
            token: this.jwtService.sign(payload, {
                secret: secret,
                expiresIn: now + lifetime,
            }),
            expired: new Date((now + lifetime) * 1000),
        };
    }
    _validateAuthenticate(body) {
        if (body.grant_type === 'password') {
            if (!['admin', 'web'].includes(body.scope) ||
                !body.password ||
                !body.username) {
                throw new custom_error_exception_1.default(401, 'UNAUTHORIZED', this.messageService.get('INVALID_AUTH'));
            }
        }
        else if (body.grant_type === 'zalo') {
            if (body.scope !== 'mini_app' || !body.access_token) {
                throw new custom_error_exception_1.default(401, 'UNAUTHORIZED', this.messageService.get('INVALID_AUTH'));
            }
        }
        else {
            throw new custom_error_exception_1.default(401, 'UNAUTHORIZED', this.messageService.get('INVALID_GRANT_TYPE'));
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_repository_1.UserRepository,
        token_repository_1.TokenRepository,
        email_token_repository_1.EmailTokenRepository,
        jwt_1.JwtService,
        auth_password_service_1.AuthPasswordService,
        auth_zalo_service_1.AuthZaloService,
        auth_email_token_service_1.AuthEmailTokenService,
        nestjs_i18n_1.I18nService])
], AuthService);
//# sourceMappingURL=auth.service.js.map