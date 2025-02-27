import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
// import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { RedisService } from './redis.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('redis'),
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModules {
  // constructor(private readonly redis: RedisService) {
  //   this.redis.conn();
  // }
}
