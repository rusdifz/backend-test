import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import {
  ReqCreateUserDTO,
  ReqGetListDTO,
  ReqPatchUserDTO,
  ReqUpdateUserDTO,
} from './dto/request.dto';

import { IJwtUser } from 'src/common/interfaces/jwt.interface';

import {
  AuthorizationHeader,
  CommonHeaders,
  swgDeleteOK,
} from 'src/common/swaggers';
import { BodyParam, UserAuth } from 'src/common/decorators';
import {
  swgGetDetailOK,
  swgGetListOK,
  swgUpdateOK,
  swgCreateOK,
  swgPatchOK,
} from './swaggers/endpoint.swagger';

import { UsersService } from './users.service';
import { AuthGuard } from 'src/middlewares/guards/auth.guard';

@CommonHeaders()
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @ApiOperation({
    summary: 'endpoint get user',
    description: '',
  })
  @ApiOkResponse(swgGetDetailOK)
  @Version('1')
  @Get(':id')
  async getDetail(@Param('id') id: number) {
    return await this.service.getDetail(id);
  }

  @ApiOperation({
    summary: 'endpoint get user list',
    description: '',
  })
  @ApiOkResponse(swgGetListOK)
  @Version('1')
  @Get('')
  async getList(@Query() query: ReqGetListDTO) {
    return await this.service.getList(query);
  }

  @ApiOperation({
    summary: 'endpoint create user',
    description: '',
  })
  @ApiHeader(AuthorizationHeader(true))
  @ApiCreatedResponse(swgCreateOK)
  @UseGuards(AuthGuard)
  @Version('1')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('')
  async create(
    @BodyParam() bodyparam: ReqCreateUserDTO,
    @UserAuth() user: IJwtUser,
  ) {
    return await this.service.create(bodyparam, user);
  }

  @ApiOperation({
    summary: 'endpoint update user',
    description: '',
  })
  @ApiHeader(AuthorizationHeader(true))
  @ApiCreatedResponse(swgUpdateOK)
  @UseGuards(AuthGuard)
  @Version('1')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Put(':id')
  async update(
    @BodyParam() bodyparam: ReqUpdateUserDTO,
    @UserAuth() user: IJwtUser,
  ) {
    return await this.service.update(bodyparam, user);
  }

  @ApiOperation({
    summary: 'endpoint patch user',
    description: '',
  })
  @ApiHeader(AuthorizationHeader(true))
  @ApiCreatedResponse(swgPatchOK)
  @UseGuards(AuthGuard)
  @Version('1')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Patch('')
  async patch(
    @BodyParam() bodyparam: ReqPatchUserDTO,
    @UserAuth() user: IJwtUser,
  ) {
    return await this.service.patch(bodyparam, user);
  }

  @ApiOperation({
    summary: 'endpoint delete user',
    description: '',
  })
  @ApiHeader(AuthorizationHeader(true))
  @ApiOkResponse(swgDeleteOK)
  @UseGuards(AuthGuard)
  @Version('1')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Delete(':id')
  async delete(
    @UserAuth() user: IJwtUser, // use this to get user data from header,
    @Param('id') id: number,
  ) {
    return await this.service.remove(id, user);
  }

  @ApiOperation({
    summary: 'endpoint get dummy user',
    description: '',
  })
  @ApiOkResponse(swgGetListOK)
  @Version('1')
  @Get('/bulk/dummy-user-to-db')
  async bulkDummyApiToDB() {
    return await this.service.bulkDummyApiToDB();
  }
}
