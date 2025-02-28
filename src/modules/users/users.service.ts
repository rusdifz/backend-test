import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from './users.repository';
import {
  mapDummyApiToResList,
  mmapDummyApiToResDetail,
} from './mappings/view.mapping';
import {
  ReqCreateUserDTO,
  ReqGetListDTO,
  ReqPatchUserDTO,
  ReqUpdateUserDTO,
} from './dto/request.dto';
import { ResUser } from './dto/response.dto';
import { IJwtUser } from 'src/common/interfaces/jwt.interface';
import {
  mapDummyApiToDB,
  mapReqCreateToDummyApi,
  mapReqPatchToDummyApi,
  mapReqUpdateToDummyApi,
} from './mappings/upsert.mapping';
import { HttpRequestService } from 'src/libs/axios/http.service';
import { IUser } from './interfaces/user.interface';
import { RedisService } from 'src/libs/redis/redis.service';
import { paginateArray } from 'src/common/helpers';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    private readonly repository: UsersRepository,
    private readonly axios: HttpRequestService,
    private readonly cache: RedisService,
  ) {}
  private readonly baseUrl = process.env.HOST_DUMMY_JSON;
  private readonly endpoint = '/users';

  async getDetail(id: number) {
    await this.repository.delete({});
    const getCache = await this.cache.get(`user_${id}`);
    console.log('get cache', getCache);

    if (getCache) {
      return getCache;
    }

    let searchApi = await this.axios.GET({
      baseUrl: this.baseUrl,
      endpoint: `${this.endpoint}/${id}`,
    });

    if (searchApi) {
      searchApi = await mmapDummyApiToResDetail(searchApi);
      await this.cache.set(`user_${id}`, searchApi);
    }

    return searchApi;
  }

  async getList(
    props: ReqGetListDTO,
  ): Promise<{ data: ResUser[]; count: number }> {
    let searchDummyApi = await this.axios.GET<IUser[]>({
      baseUrl: this.baseUrl,
      endpoint: this.endpoint,
    });

    if (searchDummyApi.length > 0) {
      searchDummyApi = await mapDummyApiToResList(searchDummyApi);
    }

    return paginateArray<IUser>(searchDummyApi, props.page, props.limit);
  }

  async create(data: ReqCreateUserDTO, admin: IJwtUser): Promise<IUser> {
    const mapData = await mapReqCreateToDummyApi(data, admin);

    const postApi = await this.axios.POST<IUser>({
      baseUrl: this.baseUrl,
      endpoint: this.endpoint,
      data: mapData,
    });

    if (postApi) {
      await this.cache.set(`user_${postApi.id}`, postApi);
      return mapData;
    }

    throw new BadRequestException();
  }

  async update(data: ReqUpdateUserDTO, admin: IJwtUser): Promise<IUser> {
    const mapData = await mapReqUpdateToDummyApi(data, admin);

    const putApi = await this.axios.PUT<IUser>({
      baseUrl: this.baseUrl,
      endpoint: `${this.endpoint}/${data.id}`,
      data: mapData,
    });

    if (putApi) {
      await this.cache.set(`user_${putApi.id}`, putApi);
      return mapData;
    }

    throw new BadRequestException();
  }

  async patch(data: ReqPatchUserDTO, admin: IJwtUser): Promise<Partial<IUser>> {
    const mapData = await mapReqPatchToDummyApi(data, admin);

    const patchApi = await this.axios.PATCH<IUser>({
      baseUrl: this.baseUrl,
      endpoint: `${this.endpoint}/${data.id}`,
      data: mapData,
    });

    if (patchApi) {
      await this.cache.set(`user_${patchApi.id}`, patchApi);
      return mapData;
    }

    throw new BadRequestException();
  }

  async remove(id: number, admin: IJwtUser) {
    const deleteApi = await this.axios.DELETE({
      baseUrl: this.baseUrl,
      endpoint: `${this.endpoint}/${id}`,
    });

    await this.cache.delete(`user_${id}`);

    return deleteApi;
  }

  //get data from api and save to DB
  async bulkDummyApiToDB(): Promise<{ data: IUser[]; count: number }> {
    try {
      const dummyUsers = await this.axios.GET<IUser[]>({
        baseUrl: this.baseUrl,
        endpoint: this.endpoint,
      });

      if (dummyUsers.length > 0) {
        for (const user of dummyUsers) {
          //validate DTO before insert db
          const userDto = plainToInstance(ReqCreateUserDTO, user);

          const errors = await validate(userDto);

          if (errors.length === 0) {
            const mapData = await mapDummyApiToDB(user);

            await Promise.all([
              this.repository.save(mapData),
              this.cache.set(`user_${user.id}`, user),
            ]);
          }
        }
      }

      return { data: dummyUsers, count: dummyUsers.length };
    } catch (error) {
      console.log('error', error);
      throw new Error(error);
    }
  }

  async onModuleInit() {
    // Check if data already exists
    const count = await this.repository.count();
    console.log('count data in postgree ', count);

    if (count === 0) {
      // Insert default data if no records exist
      await this.repository.save([
        {
          username: 'rusdifz',
          name: 'fauzan rusdi',
          email: 'fauzanrusdi20@gmail.com',
          password: await bcrypt.hash('Salwasalsabil98_', 10), // Ensure to hash the password in a real scenario
        },
      ]);
      console.log('Default users have been seeded');
    }
  }
}
