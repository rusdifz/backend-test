import * as bcrypt from 'bcrypt';

import {
  ReqCreateUserDTO,
  ReqPatchUserDTO,
  ReqUpdateUserDTO,
} from '../dto/request.dto';
import { UsersEntity } from '../entities/users.entity';
import { IJwtUser } from 'src/common/interfaces/jwt.interface';
import { IUser } from '../interfaces/user.interface';

export async function mapReqUpdateToDb(
  user: ReqUpdateUserDTO,
  admin: IJwtUser,
): Promise<Partial<UsersEntity>> {
  return {
    name: user.name,
    email: user.email,
    phone: user.phone ?? null,
    website: user.website ?? null,
    street: user.address.street ?? null,
    suite: user.address.suite ?? null,
    city: user.address.city ?? null,
    zipcode: user.address.zipcode ?? null,
    geo_lat: user.address.geo.lat ?? null,
    geo_lng: user.address.geo.lng ?? null,
    company_name: user.company.name ?? null,
    company_catchPhrase: user.company.catchPhrase ?? null,
    company_bs: user.company.bs ?? null,
    updated_by: admin?.user?.username ?? 'system',
  };
}

export async function mapDummyApiToDB(
  user: IUser,
): Promise<Partial<UsersEntity>> {
  return {
    username: user.username,
    name: user.name,
    email: user.email,
    phone: user.phone,
    website: user.website,
    street: user.address.street,
    suite: user.address.suite,
    city: user.address.city,
    zipcode: user.address.zipcode,
    geo_lat: user.address.geo.lat,
    geo_lng: user.address.geo.lng,
    company_name: user.company.name,
    company_catchPhrase: user.company.catchPhrase,
    company_bs: user.company.bs,
    password: await bcrypt.hash(user.username, 10), //for dummy user
    created_by: 'system',
  };
}

export async function mapReqCreateToDummyApi(
  user: ReqCreateUserDTO,
  admin: IJwtUser,
): Promise<IUser> {
  return {
    username: user.username,
    name: user.name,
    email: user.email,
    password: await bcrypt.hash(user.password, 10),
    phone: user.phone ?? null,
    website: user.website ?? null,
    address: user.address,
    company: user.company,
    created_at: new Date(),
    created_by: admin?.user?.username ?? 'system',
  };
}

export async function mapReqUpdateToDummyApi(
  user: ReqUpdateUserDTO,
  admin: IJwtUser,
): Promise<IUser> {
  return {
    username: user.username ?? undefined,
    name: user.name ?? null,
    email: user.email ?? null,
    password: user.password ? await bcrypt.hash(user.password, 10) : undefined,
    phone: user.phone ?? null,
    website: user.website ?? null,
    address: user.address
      ? {
          street: user.address.street ?? null,
          suite: user.address.suite ?? null,
          city: user.address.city ?? null,
          zipcode: user.address.zipcode ?? null,
          geo: user.address.geo
            ? {
                lat: user.address.geo.lat ?? null,
                lng: user.address.geo.lng ?? null,
              }
            : null,
        }
      : null,
    company: user.company
      ? {
          bs: user.company.bs ?? null,
          catchPhrase: user.company.catchPhrase ?? null,
          name: user.company.name ?? null,
        }
      : null,
    updated_at: new Date(),
    updated_by: admin?.user?.username ?? 'system',
  };
}

export async function mapReqPatchToDummyApi(
  user: ReqPatchUserDTO,
  admin: IJwtUser,
): Promise<Partial<IUser>> {
  return {
    username: user.username ?? undefined,
    name: user.name ?? undefined,
    email: user.email ?? undefined,
    password: user.password ? await bcrypt.hash(user.password, 10) : undefined,
    phone: user.phone ?? undefined,
    website: user.website ?? undefined,
    address: user.address
      ? {
          street: user.address.street ?? undefined,
          suite: user.address.suite ?? undefined,
          city: user.address.city ?? undefined,
          zipcode: user.address.zipcode ?? undefined,
          geo: user.address.geo
            ? {
                lat: user.address.geo.lat ?? undefined,
                lng: user.address.geo.lng ?? undefined,
              }
            : undefined,
        }
      : undefined,
    company: user.company
      ? {
          bs: user.company.bs ?? undefined,
          catchPhrase: user.company.catchPhrase ?? undefined,
          name: user.company.name ?? undefined,
        }
      : undefined,
    updated_at: new Date(),
    updated_by: admin?.user?.username ?? 'system',
  };
}
