import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { CacheModule, CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

import { CacheService } from './services/cache.service';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          store: await redisStore({
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
        } as CacheModuleAsyncOptions;
      },
    }),
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          config: {
            host: configService.get<string>('cache.redisHost'),
            port: configService.get<number>('cache.redisPort'),
            db: configService.get<number>('cache.redisDatabase'),
            username: configService.get<string>('cache.redisUsername'),
            password: configService.get<string>('cache.redisPassword'),
            keyPrefix: configService.get<string>('cache.redisPrefix'),
          },
        } as RedisModuleOptions;
      },
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheConfigModule {}
