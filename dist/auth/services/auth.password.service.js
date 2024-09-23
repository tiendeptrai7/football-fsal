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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthPasswordService = void 0;
const app_constant_1 = require("../../app/constant/app.constant");
const app_enum_1 = require("../../app/constant/app.enum");
const custom_error_exception_1 = __importDefault(require("../../common/error/exceptions/custom-error.exception"));
const message_service_1 = require("../../common/message/services/message.service");
const date_util_1 = require("../../common/utils/date.util");
const string_util_1 = require("../../common/utils/string.util");
const user_repository_1 = require("../../modules/user/repository/repositories/user.repository");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const dayjs_1 = __importDefault(require("dayjs"));
const nestjs_i18n_1 = require("nestjs-i18n");
let AuthPasswordService = class AuthPasswordService {
    userRepository;
    cacheManager;
    messageService;
    constructor(userRepository, cacheManager, i18nService) {
        this.userRepository = userRepository;
        this.cacheManager = cacheManager;
        this.messageService = new message_service_1.MessageService(i18nService, 'auth');
    }
    async passwordAuthenticate(username, password) {
        const emailReg = new RegExp(app_constant_1.VERIFY_EMAIL_REGEX);
        const user = await this.userRepository.getUserByCredential(username, emailReg.test(username) ? 'email' : 'username', true);
        if (!user || user.deleted_at) {
            throw new custom_error_exception_1.default(401, 'UNAUTHORIZED', this.messageService.get('UNAUTHORIZED'));
        }
        await this._checkPassword(user, password);
        await this._checkAccountStatus(user);
        if (user.login_failed > 0) {
            await this.userRepository.update({ id: user.id }, { login_failed: 0 });
        }
        return [user, await this._checkRequiredChangePassword(user)];
    }
    async resetPassword(userId, newPassword, current_password) {
        const user = await this.userRepository.getUserByCredential(userId, 'id', true);
        if (!user || user.deleted_at) {
            throw new custom_error_exception_1.default(401, 'UNAUTHORIZED', this.messageService.get('UNAUTHORIZED'));
        }
        const isNewPasswordSame = await (0, string_util_1.comparePassword)(newPassword, user.password);
        if (current_password) {
            const isCurrentPasswordSame = await (0, string_util_1.comparePassword)(current_password, user.password);
            if (!isCurrentPasswordSame) {
                throw new custom_error_exception_1.default(400, 'PASS_NOT_MATCH', this.messageService.get('PASS_NOT_MATCH'));
            }
        }
        if (isNewPasswordSame) {
            throw new custom_error_exception_1.default(400, 'SAME_PASSWORD', this.messageService.get('SAME_PASSWORD'));
        }
        await this.userRepository.update({ id: user.id }, {
            password: await (0, string_util_1.hashPassword)(newPassword),
            change_password_at: new Date(),
        });
    }
    async changePassword(input, loggedUser) {
        if (input.new_password === input.current_password) {
            throw new custom_error_exception_1.default(400, 'SAME_PASSWORD', this.messageService.get('SAME_PASSWORD'));
        }
        await this.resetPassword(loggedUser.id, input.new_password, input.current_password);
    }
    async _checkAccountStatus(user) {
        if (user.status === app_enum_1.EStatus.inactive) {
            throw new custom_error_exception_1.default(401, 'ACCOUNT_INACTIVE', this.messageService.get('ACCOUNT_INACTIVE'));
        }
        const isLock = await this.cacheManager.get(`lock_${user.id}`);
        if (isLock) {
            throw new custom_error_exception_1.default(401, 'ACCOUNT_LOCK', this.messageService.get('ACCOUNT_LOCK'), { locked_end: isLock });
        }
    }
    async _checkPassword(user, password) {
        const isPasswordCorrect = await (0, string_util_1.comparePassword)(password, user.password);
        if (!isPasswordCorrect) {
            const maxLoginFail = +(await this.cacheManager.get('MAX_LOGIN_FAIL'));
            const lockedEnd = user.login_failed + 1 > maxLoginFail
                ? (0, dayjs_1.default)().add(2, 'minute').toISOString()
                : undefined;
            await this._handleIncorrectLogin(user, lockedEnd);
            throw new custom_error_exception_1.default(401, user.login_failed + 1 > maxLoginFail ? 'ACCOUNT_LOCK' : 'UNAUTHORIZED', this.messageService.get(user.login_failed + 1 > maxLoginFail
                ? 'ACCOUNT_LOCK'
                : 'UNAUTHORIZED'), {
                locked_end: lockedEnd,
            });
        }
    }
    async _handleIncorrectLogin(user, lockedEnd) {
        if (lockedEnd) {
            await Promise.all([
                this.cacheManager.set(`lock_${user.id}`, lockedEnd, 2 * 60000),
                this.userRepository.update({ id: user.id }, { login_failed: 0 }),
            ]);
        }
        else {
            await this.userRepository.update({ id: user.id }, { login_failed: user.login_failed + 1 });
        }
    }
    async _checkRequiredChangePassword(user) {
        if (!user.change_password_at) {
            return true;
        }
        const passwordLifetime = +(await this.cacheManager.get('PASSWORD_LIFE_TIME'));
        return (0, date_util_1.greaterThanNow)(user.change_password_at, passwordLifetime);
    }
};
exports.AuthPasswordService = AuthPasswordService;
exports.AuthPasswordService = AuthPasswordService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository, Object, nestjs_i18n_1.I18nService])
], AuthPasswordService);
//# sourceMappingURL=auth.password.service.js.map