import { Inject, Injectable } from '@nestjs/common';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  readonly exp = 24 * 60 * 30; // 12 hours

  async get(key: string) {
    try {
      const data = await this.cacheService.get<string>(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.log('ERR get cache - ' + error);
      return null;
    }
  }

  async set(key: string, data: any, exp: any = this.exp): Promise<void> {
    try {
      await this.cacheService.set(key, JSON.stringify(data), exp);
    } catch (error) {
      console.log('ERR set cache - ' + error);
    }
  }

  async delete(key: string) {
    try {
      return await this.cacheService.del(key);
    } catch (error) {
      console.log('ERR delete cache - ' + error);
    }
  }
}
