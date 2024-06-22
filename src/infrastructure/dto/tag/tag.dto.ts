import { Expose } from 'class-transformer';

export class TagDto {
  @Expose({ name: 'name' })
  name: string;

  @Expose({ name: 'id' })
  id: number;
}
