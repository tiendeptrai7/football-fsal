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
exports.UserService = void 0;
const app_enum_1 = require("../../../app/constant/app.enum");
const auth_service_1 = require("../../../auth/services/auth.service");
const custom_error_exception_1 = __importDefault(require("../../../common/error/exceptions/custom-error.exception"));
const message_service_1 = require("../../../common/message/services/message.service");
const object_util_1 = require("../../../common/utils/object.util");
const string_util_1 = require("../../../common/utils/string.util");
const role_repository_1 = require("../../role/repository/repositories/role.repository");
const system_service_1 = require("../../system/services/system.service");
const zalo_service_1 = require("../../zalo/services/zalo.service");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../repository/entities/user.entity");
const profile_repository_1 = require("../repository/repositories/profile.repository");
const user_repository_1 = require("../repository/repositories/user.repository");
let UserService = class UserService {
    userRepository;
    roleRepository;
    profileRepository;
    systemService;
    authService;
    zaloService;
    logger;
    cacheManager;
    userMessage;
    constructor(userRepository, roleRepository, profileRepository, systemService, authService, zaloService, logger, cacheManager, i18nService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.profileRepository = profileRepository;
        this.systemService = systemService;
        this.authService = authService;
        this.zaloService = zaloService;
        this.logger = logger;
        this.cacheManager = cacheManager;
        this.userMessage = new message_service_1.MessageService(i18nService, 'user');
    }
    async getList(params) {
        const [data, count] = await this.userRepository.getList(params);
        return (0, object_util_1.wrapPagination)(data, count, params);
    }
    async getListZaloUser(params) {
        const [data, count] = await this.profileRepository.getListZaloUser(params);
        return (0, object_util_1.wrapPagination)(data, count, params);
    }
    async create(input) {
        await this._checkDuplicateInfo(input);
        const password = await (0, string_util_1.hashPassword)((0, string_util_1.generateCode)({ length: 10, charset: string_util_1.ECharset.alphanumeric }));
        const roles = await this.roleRepository.find({
            where: { id: (0, typeorm_1.In)(input.role_ids) },
        });
        if (roles.length !== input.role_ids.length) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.userMessage.get('NOT_FOUND'));
        }
        if (!input.role_ids.length) {
            const role = await this.roleRepository.findOne({
                where: { slug: 'user_standard' },
            });
            roles.push(role);
        }
        const user = new user_entity_1.User();
        Object.assign(user, {
            ...input,
            password,
            user_roles: roles.map((r) => ({
                role: r,
            })),
        });
        await this.userRepository.save(user);
        this.systemService.getValueByKey('AUTO_SEND_RESET_PASS').then((v) => {
            if (+v === 1) {
                this.authService.forgotPassword({ email: user.email }).then();
            }
        });
    }
    async update(input) {
        const user = await this.getById(input.id);
        if (!user) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.userMessage.get('NOT_FOUND'));
        }
        await this._checkDuplicateInfo(input, input?.id);
        const roles = await this.roleRepository.find({
            where: {
                id: (0, typeorm_1.In)(input.role_ids),
            },
        });
        if (roles.findIndex((v) => v.slug === 'admin') > -1 &&
            input.status === app_enum_1.EStatus.inactive) {
            throw new custom_error_exception_1.default(400, 'NOT_ALLOW', this.userMessage.get('NOT_ALLOW'));
        }
        Object.assign(user, {
            ...input,
            user_roles: roles.map((role) => ({ role: role })),
        });
        await this.userRepository.save(user);
    }
    async toggleStatus(id) {
        const user = await this.userRepository.getUserWithProfile(id, 'id');
        if (!user) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.userMessage.get('NOT_FOUND'));
        }
        if (user.user_roles.findIndex((v) => v.role.slug === 'admin') > -1) {
            throw new custom_error_exception_1.default(400, 'NOT_ALLOW', this.userMessage.get('NOT_ALLOW'));
        }
        const status = user.status === app_enum_1.EStatus.active ? 0 : 1;
        await this.userRepository.update({ id }, { status });
    }
    async delete(id) {
        const user = await this.getById(id);
        if (user.user_roles.some((ur) => ur.role.slug === 'admin')) {
            throw new custom_error_exception_1.default(400, 'NOT_ALLOW', this.userMessage.get('NOT_ALLOW'));
        }
        await this.userRepository.softDelete(user.id);
    }
    async getById(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['user_roles', 'user_roles.role', 'profile'],
        });
        if (!user) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.userMessage.get('NOT_FOUND'));
        }
        return user;
    }
    async myProfile(loggedUser) {
        const user = await this.userRepository.getUserWithProfile(loggedUser.id, 'id');
        this._updateZaloFollowDetails(user);
        return user;
    }
    async followOA(input, loggedUser) {
        const profile = await this.getZaloUserById(loggedUser.id);
        if (!profile.zalo_follow_oa_id || !profile.phone) {
            await this.profileRepository.update({ user_id: loggedUser.id }, {
                zalo_follow_oa_id: input.zalo_follow_oa_id,
                zalo_follow_at: profile?.zalo_follow_at ?? new Date(),
            });
        }
    }
    async getZaloUserById(id) {
        const profile = await this.profileRepository.getZaloUserById(id);
        if (!profile) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.userMessage.get('NOT_FOUND'));
        }
        return profile;
    }
    async updateProfile(input, loggedUser) {
        await this.profileRepository.update({ user_id: loggedUser.id }, {
            phone: input.phone,
        });
    }
    async resetLock(input) {
        await this.cacheManager.del(`lock_${input.id}`);
    }
    async _checkDuplicateInfo(input, id) {
        const { email, username } = input;
        const users = await this.userRepository.find({
            where: [{ username }, { email }],
        });
        const duplicateUsername = users.find((u) => u.username.toLowerCase() === username?.toLowerCase() &&
            (id ? u.id !== id : true));
        if (duplicateUsername) {
            throw new custom_error_exception_1.default(400, 'USERNAME_IN_USED', this.userMessage.get('USERNAME_IN_USED'));
        }
        const duplicateEmail = users.find((user) => user.email === email && (id ? user.id !== id : true));
        if (duplicateEmail) {
            throw new custom_error_exception_1.default(400, 'EMAIL_IN_USED', this.userMessage.get('EMAIL_IN_USED'));
        }
    }
    async _updateZaloFollowDetails(user) {
        try {
            if (!user.profile.zalo_follow_oa_id && user.profile.zalo_id) {
                const userDetail = await this.zaloService.getUserDetail(user.profile.zalo_id);
                if (!userDetail)
                    return;
                const partialEntity = {
                    zalo_follow_at: new Date(),
                    zalo_follow_oa_id: userDetail.user_id,
                };
                await this.profileRepository.update({ user_id: user.id }, partialEntity);
            }
        }
        catch (error) {
            this.logger.error(`Error update zalo follow with profile ${JSON.stringify(user.profile)}}`, error, 'UserService.updateZaloFollowDetails');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(7, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        role_repository_1.RoleRepository,
        profile_repository_1.ProfileRepository,
        system_service_1.SystemService,
        auth_service_1.AuthService,
        zalo_service_1.ZaloService,
        common_1.Logger, Object, nestjs_i18n_1.I18nService])
], UserService);
//# sourceMappingURL=user.service.js.map