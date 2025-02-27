import { Body, Controller, Post, Version } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { ApiCreatedResponse, ApiHeader, ApiOperation } from '@nestjs/swagger';

import { CommonHeaders } from 'src/common/swaggers';
import { LoginDTO } from './dto/request.dto';
import { swgLoginOK } from './swaggers/endpoint.swagger';

import { AuthService } from './auth.service';

@Controller('auth')
@CommonHeaders()
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiOperation({ summary: 'endpoint login' })
  @ApiCreatedResponse(swgLoginOK)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Version('1')
  @Post('login')
  async login(@Body() body: LoginDTO) {
    return await this.service.login(body);
  }
}
