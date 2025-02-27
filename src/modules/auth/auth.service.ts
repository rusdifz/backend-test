import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { UsersEntity } from '../users/entities/users.entity';
import { UsersRepository } from '../users/users.repository';

import { LoginDTO } from './dto/request.dto';

@Injectable()
export class AuthService {
  constructor(private readonly repositoryUser: UsersRepository) {}

  async login(payload: LoginDTO): Promise<string> {
    let user: UsersEntity;

    if (payload.email) {
      user = await this.repositoryUser.findOneBy({ email: payload.email });
    } else {
      user = await this.repositoryUser.findOneBy({
        username: payload.username,
      });
    }

    if (user) {
      const isMatchPassword = await bcrypt.compare(
        payload.password,
        user.password,
      );

      if (isMatchPassword) {
        delete user.password;
        const token = jwt.sign({ user }, process.env.JWT_KEY);
        return token;
      }
    }

    throw new BadRequestException('Incorrect username or password');
  }
}
