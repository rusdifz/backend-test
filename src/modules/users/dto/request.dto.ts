import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

import { IUser } from '../interfaces/user.interface';
import { Transform, Type } from 'class-transformer';
import { UsersEntity } from '../entities/users.entity';
import { IsUnique } from 'src/common/decorators';
import { paginationDefault } from 'src/common/consts/pagination.const';

export class ReqGetListDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @Transform((dt) => {
    return Number(dt.value);
  })
  page: number = paginationDefault.page;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform((dt) => {
    return Number(dt.value);
  })
  limit: number = paginationDefault.limit;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  order?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search_keyword?: string;
}

class Address {
  @ApiProperty({ example: 'Bojong Depok Baru' })
  @IsOptional()
  @IsString()
  street: string;

  @ApiProperty({ example: 'perumahan' })
  @IsOptional()
  @IsString()
  suite: string;

  @ApiProperty({ example: 'Bogor' })
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty({ example: '16913' })
  @IsOptional()
  @IsString()
  zipcode: string;

  @ApiProperty({
    example: {
      geo_lat: '-37.3159',
      geo_lng: '81.1496',
    },
  })
  @IsOptional()
  geo: {
    lat: string;
    lng: string;
  };
}

class Company {
  @ApiProperty({ example: 'PT. Digdaya Olah Teknologi (DOT) Indonesia' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Multi-layered client-server neural-net' })
  @IsOptional()
  @IsString()
  catchPhrase: string;

  @ApiProperty({ example: 'harness real-time e-markets' })
  @IsOptional()
  @IsString()
  bs: string;
}

export class ReqCreateUserDTO implements Partial<IUser> {
  @ApiProperty({ example: 'rusdifz' })
  @IsNotEmpty()
  @IsString()
  @IsUnique(UsersEntity, 'username', { message: 'Username already exist' }) //check username exist
  username: string;

  @ApiProperty({ example: 'fauzanrusdi20@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  @IsUnique(UsersEntity, 'email', { message: 'Email already exist' }) //check email exist
  email: string;

  @ApiProperty({ example: 'fauzan rusdi' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Testpass98_' })
  @ValidateIf((o) => !o.dummy)
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: '+6287870702538' })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({ example: 'www.razone.com' })
  @IsOptional()
  @IsString()
  website: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => Address)
  address: Address;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => Company)
  company: Company;

  @ApiHideProperty()
  @IsOptional()
  dummy: boolean = true;
}

export class ReqUpdateUserDTO extends ReqCreateUserDTO {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class ReqPatchUserDTO extends PartialType(ReqUpdateUserDTO) {}
