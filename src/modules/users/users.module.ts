import { Module } from '@nestjs/common';

import { HttpRequestModule } from 'src/libs/axios/http.module';

import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { RedisModules } from 'src/libs/redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    HttpRequestModule,
    RedisModules,
  ],
  providers: [
    {
      provide: Object,
      useValue: [UsersEntity],
    },
    UsersRepository,
    UsersService,
  ],
  controllers: [UsersController],
  exports: [UsersRepository],
})
export class UsersModule {}
