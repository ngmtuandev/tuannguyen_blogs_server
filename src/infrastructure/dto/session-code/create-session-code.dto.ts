import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateSessionCodeDto {
  @Expose({ name: 'code' })
  @IsNotEmpty()
  code: number;

  @Expose({ name: 'data' })
  @IsNotEmpty()
  data: string;
}
