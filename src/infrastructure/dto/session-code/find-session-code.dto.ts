import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class FindSessionCodeDto {
  @Expose({ name: 'code' })
  @IsNotEmpty()
  code: number;
}
