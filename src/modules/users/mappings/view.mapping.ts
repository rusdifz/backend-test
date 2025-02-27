import * as bcrypt from 'bcrypt';

import { ResUser } from '../dto/response.dto';
import { IUser } from '../interfaces/user.interface';

export async function mapDummyApiToResList(
  dummy: Partial<IUser[]>,
): Promise<Partial<ResUser[]>> {
  const resList = await Promise.all(
    dummy.map(async (dt) => {
      return {
        id: dt.id,
        username: dt.username,
        name: dt.name,
        email: dt.email,
        password: await bcrypt.hash(dt.name, 10),
        phone: dt.phone,
        website: dt.website,
        address: dt.address,
        company: dt.company,
        created_at: dt.created_at ?? new Date(),
        created_by: dt.created_by ?? 'system',
        updated_at: dt.updated_at ?? new Date(),
        updated_by: dt.updated_by ?? 'system',
        deleted_at: null,
      };
    }),
  );

  return resList;
}

export async function mmapDummyApiToResDetail(
  dt: Partial<IUser>,
): Promise<ResUser> {
  return {
    id: dt.id,
    username: dt.username,
    name: dt.name,
    email: dt.email,
    password: await bcrypt.hash(dt.name, 10),
    phone: dt.phone,
    website: dt.website,
    address: dt.address,
    company: dt.company,
    created_at: new Date(),
    created_by: '',
    updated_at: new Date(),
    updated_by: dt.updated_by ?? 'system',
    deleted_at: null,
  };
}
