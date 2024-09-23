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
exports.AuthZaloService = void 0;
const app_enum_1 = require("../../app/constant/app.enum");
const custom_error_exception_1 = __importDefault(require("../../common/error/exceptions/custom-error.exception"));
const message_service_1 = require("../../common/message/services/message.service");
const object_util_1 = require("../../common/utils/object.util");
const string_util_1 = require("../../common/utils/string.util");
const role_repository_1 = require("../../modules/role/repository/repositories/role.repository");
const profile_repository_1 = require("../../modules/user/repository/repositories/profile.repository");
const user_repository_1 = require("../../modules/user/repository/repositories/user.repository");
const axios_1 = require("@nestjs/axios");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let AuthZaloService = class AuthZaloService {
    cacheManager;
    userRepository;
    roleRepository;
    profileRepository;
    httpService;
    authMessage;
    constructor(cacheManager, userRepository, roleRepository, profileRepository, httpService, i18nService) {
        this.cacheManager = cacheManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.profileRepository = profileRepository;
        this.httpService = httpService;
        this.authMessage = new message_service_1.MessageService(i18nService, 'auth');
    }
    async zaloAuthenticate(access_token) {
        const zalo_profile = await this._getZaloProfile(access_token);
        if (!zalo_profile?.full_name?.trim()) {
            throw new custom_error_exception_1.default(400, 'LOGIN_ZALO_FAILED', this.authMessage.get('LOGIN_ZALO_MISSING_NAME'));
        }
        const user = await this.userRepository.findOne({
            where: {
                profile: {
                    zalo_id: zalo_profile.id,
                },
            },
            relations: ['profile', 'user_roles', 'user_roles.role'],
        });
        if (!user) {
            const [role, defaultPass] = await Promise.all([
                this.roleRepository.findOne({
                    where: { slug: 'user_standard' },
                }),
                this.cacheManager.get('DEFAULT_PASSWORD'),
            ]);
            const count = await this.userRepository.count({ withDeleted: true });
            const code = (0, object_util_1.padStart)(String(count + 1), 8, '0');
            const body = {
                username: `novo_nordisk_${zalo_profile.id}`,
                password: defaultPass || (await (0, string_util_1.hashPassword)(new Date().getTime().toString())),
                profile: {
                    full_name: zalo_profile.full_name,
                    avatar: zalo_profile.avatar,
                    zalo_id: zalo_profile.id,
                    code,
                },
                user_roles: [
                    {
                        role: role,
                    },
                ],
            };
            return await this.userRepository.save(body);
        }
        if (user?.profile &&
            (!user.profile.full_name || !user.profile.avatar) &&
            (zalo_profile.full_name || zalo_profile.avatar)) {
            await this.profileRepository.update({ user_id: user.id }, { full_name: zalo_profile.full_name, avatar: zalo_profile.avatar });
        }
        if (user.status === app_enum_1.EStatus.inactive) {
            throw new custom_error_exception_1.default(401, 'ACCOUNT_INACTIVE', this.authMessage.get('ACCOUNT_INACTIVE'));
        }
        return user;
    }
    async _getZaloProfile(access_token) {
        const { data: result } = await (0, rxjs_1.firstValueFrom)(this.httpService
            .get('https://graph.zalo.me/v2.0/me', {
            params: {
                fields: 'id,name,picture',
            },
            headers: {
                access_token: access_token,
            },
        })
            .pipe((0, operators_1.catchError)((error) => {
            if (error.response) {
                const { data, status } = error.response;
                throw new custom_error_exception_1.default(status, data?.errorCode, data?.message);
            }
            throw error;
        })));
        if (result.error !== 0) {
            throw new custom_error_exception_1.default(401, 'LOGIN_ZALO_FAILED', this.authMessage.get('LOGIN_ZALO_FAILED'));
        }
        return {
            id: result.id,
            full_name: result.name,
            avatar: result.picture?.data?.url || '',
        };
    }
};
exports.AuthZaloService = AuthZaloService;
exports.AuthZaloService = AuthZaloService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, user_repository_1.UserRepository,
        role_repository_1.RoleRepository,
        profile_repository_1.ProfileRepository,
        axios_1.HttpService,
        nestjs_i18n_1.I18nService])
], AuthZaloService);
//# sourceMappingURL=auth.zalo.service.js.map