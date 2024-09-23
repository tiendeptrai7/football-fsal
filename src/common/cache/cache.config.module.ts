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
            url: 'rediss://red-crohjld6l47c73fnoorg:z3kvVhGLicgaxE8UZLNlrfArZmKAdMp0@oregon-redis.render.com:6379',
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
            url: 'rediss://red-crohjld6l47c73fnoorg:z3kvVhGLicgaxE8UZLNlrfArZmKAdMp0@oregon-redis.render.com:6379',
          },
        } as RedisModuleOptions;
      },
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheConfigModule {}
