import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserDto {

  @IsEmail()
  @IsOptional()
  @Expose({name: 'email'})
  email: string;

  @IsString()
  @IsOptional()
  @Expose({name: 'userName'})
  userName: string;

  @IsString()
  @IsOptional()
  @Expose({name: 'description'})
  description?: string;

  @IsString()
  @IsOptional()
  @Expose({name: 'avatar'})
  avatar: string 


}
