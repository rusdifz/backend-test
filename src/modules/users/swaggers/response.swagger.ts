import { ApiProperty } from '@nestjs/swagger';

import { Meta, MetaUpsert, Pagination } from 'src/common/swaggers';
import { ResUser } from '../dto/response.dto';

import * as getUserList from '../dummy-json/get-user-list.dummy.json';
import * as getUser from '../dummy-json/get-user.dumy.json';
import * as createUser from '../dummy-json/create-user.dummy.json';
import * as updateUser from '../dummy-json/update-user.dummy.json';
import * as patchUser from '../dummy-json/patch-user.dummy.json';
import * as pagination from 'src/common/dummy-json/pagination.dummy.json';
import {
  ReqCreateUserDTO,
  ReqPatchUserDTO,
  ReqUpdateUserDTO,
} from '../dto/request.dto';

export class SwgListUser {
  @ApiProperty()
  meta: Meta;

  @ApiProperty({ type: [ResUser], example: getUserList })
  data: ResUser[];

  @ApiProperty({ type: Pagination, example: pagination })
  pagination: Pagination;
}

export class SwgDetailUser {
  @ApiProperty()
  meta: Meta;

  @ApiProperty({ type: ResUser, example: getUser })
  data: ResUser;
}

export class SwgCreateUser {
  @ApiProperty()
  meta: MetaUpsert;

  @ApiProperty({ type: ReqCreateUserDTO, example: createUser })
  data: ReqCreateUserDTO;
}

export class SwgUpdateUser {
  @ApiProperty()
  meta: MetaUpsert;

  @ApiProperty({ type: ReqUpdateUserDTO, example: updateUser })
  data: ReqUpdateUserDTO;
}

export class SwgPathcUser {
  @ApiProperty()
  meta: MetaUpsert;

  @ApiProperty({ type: ReqPatchUserDTO, example: patchUser })
  data: ReqPatchUserDTO;
}
