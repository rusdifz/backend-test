import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { IsUniqueConstraint } from './common/decorators';
import { configIndex } from './config';
import { DbModule } from './config/db/db.module';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(configIndex),
    DbModule,
    ThrottlerModule.forRoot([
      {
        ttl: 10,
        limit: 3,
      },
    ]),
    UsersModule,
    AuthModule,
  ],
  providers: [IsUniqueConstraint],
})
export class AppModule {}
