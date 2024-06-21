import { IsNotEmpty } from 'class-validator';
import { isPassword, matchPassword } from 'src/common/decorators';
import { IdDto } from 'src/common/dto';

export class UpdatePasswordDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @isPassword()
  newPassword: string;

  @matchPassword('newPassword')
  @IsNotEmpty()
  passwordConfirm: string;
}
