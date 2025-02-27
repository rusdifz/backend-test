import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../interfaces/user.interface';

export class ResUser implements Partial<IUser> {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  website: string;

  @ApiProperty()
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };

  @ApiProperty()
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };

  created_at?: Date;

  created_by?: string;

  updated_at?: Date;

  updated_by?: string;

  deleted_at?: Date;
}
