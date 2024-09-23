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
exports.CacheService = void 0;
const object_util_1 = require("../../utils/object.util");
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const common_1 = require("@nestjs/common");
let CacheService = class CacheService {
    redisService;
    client;
    constructor(redisService) {
        this.redisService = redisService;
        this.client = this.redisService.getClient();
    }
    async set(key, value) {
        return this.client.set(key, value);
    }
    async getINCRKey(key) {
        return this.client.incr(key);
    }
    async generateCodeINCR(key, prefix, identifier, lastEntityCode) {
        let INCRID = (await this.getINCRKey(key)) ?? 1;
        if (INCRID <= 1) {
            const lastCode = await lastEntityCode();
            if (lastCode.trim().length) {
                const lastNumber = parseInt(lastCode.split('_').pop());
                if (!isNaN(lastNumber)) {
                    INCRID = lastNumber + 1;
                    this.set(key, INCRID);
                }
            }
        }
        const incrementID = (0, object_util_1.padStart)(String(INCRID), 3, '0');
        return `${prefix}_${identifier ? identifier + '_' : ''}${incrementID}`;
    }
};
exports.CacheService = CacheService;
exports.CacheService = CacheService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_redis_1.RedisService])
], CacheService);
//# sourceMappingURL=cache.service.js.map