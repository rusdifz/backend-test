import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUser } from 'src/modules/users/interfaces/user.interface';

export class LoginDTO implements Partial<IUser> {
  @ApiProperty({ example: 'rusdifz' })
  @ValidateIf((o) => !o.email)
  @IsNotEmpty({ message: 'username or email not empty' })
  @IsString()
  username?: string;

  @ApiProperty({ example: 'fauzanrusdi20@gmail.com' })
  @ValidateIf((o) => !o.username)
  @IsNotEmpty({ message: 'username or email not empty' })
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'Testpass98_' })
  @IsOptional()
  @IsString()
  password: string;
}
