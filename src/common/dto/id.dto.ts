import { IsEmail, IsNotEmpty } from 'class-validator';

export class IdDto {
  @IsNotEmpty()
  id: number;
}
