import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, DeepPartial, EntityTarget, Repository } from 'typeorm';

import { UsersEntity } from './entities/users.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/repositories/base.repository';

@Injectable()
export class UsersRepository extends BaseRepository<UsersEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(UsersEntity, dataSource);
  }
}
