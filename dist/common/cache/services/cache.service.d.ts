import { RedisService } from '@liaoliaots/nestjs-redis';
export declare class CacheService {
    private redisService;
    private client;
    constructor(redisService: RedisService);
    set(key: string, value: any): Promise<string>;
    getINCRKey(key: string): Promise<number>;
    generateCodeINCR(key: string, prefix: string, identifier?: string, lastEntityCode?: () => Promise<string>): Promise<string>;
}
