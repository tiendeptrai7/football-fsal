import { padStart } from '@common/utils/object.util';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  private client: Redis;

  constructor(private redisService: RedisService) {
    this.client = this.redisService.getClient();
  }

  async set(key: string, value: any): Promise<string> {
    return this.client.set(key, value);
  }

  async getINCRKey(key: string): Promise<number> {
    return this.client.incr(key);
  }

  async generateCodeINCR(
    key: string,
    prefix: string,
    identifier?: string,
    lastEntityCode?: () => Promise<string>,
  ) {
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

    const incrementID = padStart(String(INCRID), 3, '0');

    return `${prefix}_${identifier ? identifier + '_' : ''}${incrementID}`;
  }
}
