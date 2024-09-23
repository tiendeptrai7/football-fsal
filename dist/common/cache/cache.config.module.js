"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheConfigModule = void 0;
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cache_manager_redis_yet_1 = require("cache-manager-redis-yet");
const cache_service_1 = require("./services/cache.service");
let CacheConfigModule = class CacheConfigModule {
};
exports.CacheConfigModule = CacheConfigModule;
exports.CacheConfigModule = CacheConfigModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            cache_manager_1.CacheModule.registerAsync({
                isGlobal: true,
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    return {
                        store: await (0, cache_manager_redis_yet_1.redisStore)({
                            socket: {
                                host: configService.get('cache.redisHost'),
                                port: +configService.get('cache.redisPort'),
                            },
                            database: configService.get('cache.redisDatabase'),
                            username: configService.get('cache.redisUsername'),
                            password: configService.get('cache.redisPassword'),
                            keyPrefix: configService.get('cache.redisPrefix'),
                        }),
                        ttl: +configService.get('cache.redisTTL'),
                    };
                },
            }),
            nestjs_redis_1.RedisModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    return {
                        config: {
                            host: configService.get('cache.redisHost'),
                            port: configService.get('cache.redisPort'),
                            db: configService.get('cache.redisDatabase'),
                            username: configService.get('cache.redisUsername'),
                            password: configService.get('cache.redisPassword'),
                            keyPrefix: configService.get('cache.redisPrefix'),
                        },
                    };
                },
            }),
        ],
        providers: [cache_service_1.CacheService],
        exports: [cache_service_1.CacheService],
    })
], CacheConfigModule);
//# sourceMappingURL=cache.config.module.js.map