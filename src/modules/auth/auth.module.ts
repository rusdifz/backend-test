import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersEntity } from '../users/entities/users.entity';
import { UsersModule } from '../users/users.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), UsersModule],
  providers: [
    {
      provide: Object,
      useValue: [UsersEntity],
    },
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
