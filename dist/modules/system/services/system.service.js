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
exports.SystemService = void 0;
const app_enum_1 = require("../../../app/constant/app.enum");
const custom_error_exception_1 = __importDefault(require("../../../common/error/exceptions/custom-error.exception"));
const message_service_1 = require("../../../common/message/services/message.service");
const object_util_1 = require("../../../common/utils/object.util");
const string_util_1 = require("../../../common/utils/string.util");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const typeorm_1 = require("typeorm");
const system_entity_1 = require("../repository/entities/system.entity");
const system_repository_1 = require("../repository/repositories/system.repository");
let SystemService = class SystemService {
    cacheManager;
    systemRepository;
    messageService;
    _specialKeys = [
        'DEFAULT_PASSWORD',
        'MAX_LOGIN_FAIL',
        'ZALO_OA_ID',
        'ZALO_APP_ID',
        'ZALO_APP_SECRET_KEY',
        'ZALO_OA_ACCESS_TOKEN',
        'ZALO_OA_REFRESH_TOKEN',
        'ZALO_TEMPLATE_ID',
        'MAX_ZNS_PER_DAY',
        'AUTO_SEND_RESET_PASS',
        'ALLOW_EDIT_PHONE',
        'ZALO_WEBHOOK_OA_SECRET_KEY',
    ];
    constructor(cacheManager, systemRepository, i18nService) {
        this.cacheManager = cacheManager;
        this.systemRepository = systemRepository;
        this.messageService = new message_service_1.MessageService(i18nService, 'system');
    }
    async getList(params) {
        const [data, count] = await this.systemRepository.getList(params);
        return (0, object_util_1.wrapPagination)(data, count, params);
    }
    async create(input) {
        await this._checkDuplicateKey(input.key);
        const obj = new system_entity_1.System();
        Object.assign(obj, input);
        await this.systemRepository.save(obj);
    }
    async update(input) {
        if (input.id) {
            delete input.key;
        }
        const data = await this.systemRepository.findOne({
            where: [{ id: input.id }, { key: input.key }],
        });
        if (!data) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.messageService.get('NOT_FOUND'));
        }
        await this.systemRepository.save(Object.assign(data, input));
        await this._cachingSpecialKey(data.key, data.value);
    }
    async getById(id) {
        const options = { where: { id } };
        const data = await this.systemRepository.findOne(options);
        if (!data) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.messageService.get('NOT_FOUND'));
        }
        return data;
    }
    async getByKey(key) {
        const options = { where: { key } };
        const data = await this.systemRepository.findOne(options);
        if (!data) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', 'System not found !');
        }
        return data;
    }
    async getValueByKey(key, skipRevalidate) {
        let value;
        let isCaching = false;
        if (this._specialKeys.includes(key)) {
            value = await this.cacheManager.get(key);
            if (skipRevalidate)
                return value;
            isCaching = true;
        }
        if (!value) {
            const system = await this.getByKey(key);
            value = system?.value?.[0];
            if (isCaching) {
                this._cachingSpecialKey(key, value).then();
            }
        }
        return value;
    }
    async delete(id) {
        const data = await this.systemRepository.findOne({
            where: { id },
        });
        if (!data) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.messageService.get('NOT_FOUND'));
        }
        await this.systemRepository.delete(id);
    }
    async getListPublic() {
        return await this.systemRepository.find({
            where: { is_public: app_enum_1.EStatus.active, status: app_enum_1.EStatus.active },
        });
    }
    async getPublicByKey(key) {
        const data = await this.systemRepository.findOne({
            where: { is_public: app_enum_1.EStatus.active, status: app_enum_1.EStatus.active, key },
        });
        if (!data) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.messageService.get('NOT_FOUND'));
        }
        return data;
    }
    async cachingDefaultValue() {
        const systems = await this.systemRepository.findBy({
            key: (0, typeorm_1.In)(this._specialKeys),
        });
        for (const system of systems) {
            await this._cachingSpecialKey(system.key, Array.isArray(system.value) ? system.value[0] : system.value);
        }
    }
    async _checkDuplicateKey(key, id) {
        const system = await this.systemRepository.findOne({
            where: { key: key, id: (0, typeorm_1.Not)(id || -1) },
        });
        if (system) {
            throw new custom_error_exception_1.default(400, 'KEY_INVALID', this.messageService.get('KEY_INVALID'));
        }
    }
    async _cachingSpecialKey(key, value) {
        switch (key) {
            case 'DEFAULT_PASSWORD':
                const hash = await (0, string_util_1.hashPassword)(value);
                await this.cacheManager.set(key, hash);
                break;
            case 'ZALO_OA_ACCESS_TOKEN':
                await this.cacheManager.set(key, value, 9000 * 1000);
                break;
            case 'ZALO_OA_REFRESH_TOKEN':
                await this.cacheManager.set(key, value, 30 * 86400 * 1000);
                break;
            default:
                await this.cacheManager.set(key, value);
                break;
        }
    }
};
exports.SystemService = SystemService;
exports.SystemService = SystemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, system_repository_1.SystemRepository,
        nestjs_i18n_1.I18nService])
], SystemService);
//# sourceMappingURL=system.service.js.map