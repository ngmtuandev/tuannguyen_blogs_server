import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { isPassword, matchPassword } from 'src/common/decorators';
import { ROLE_CODE } from 'src/infrastructure/enum';

export class CreateUserDto {
  @ApiProperty({
    example: 'nguyenmanhtuan@gmail.com',
    description: 'Email include @',
    uniqueItems: true,
    nullable: false,
    minLength: 6,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Manhtuan@123#',
    description: 'Password must have a character, number and symbel',
    nullable: false,
    minLength: 6,
  })
  @isPassword()
  @IsNotEmpty()
  password: string;

  @matchPassword('password')
  @IsNotEmpty()
  passwordConfirm: string;

  @ApiProperty({
    example: 'Nguyen Manh Tuan',
    description: 'Name of client',
    nullable: false,
  })
  @IsString()
  userName: string;

  @ApiProperty({
    example: 'Client',
    description: 'Client (default) or Admin',
  })
  @IsEnum(ROLE_CODE)
  @IsOptional()
  role?: ROLE_CODE = ROLE_CODE.Client;

  @ApiProperty({
    example: 'Province, where you from, social media',
    description: 'Additional info client as province, hobby.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  avatar: string 
}
