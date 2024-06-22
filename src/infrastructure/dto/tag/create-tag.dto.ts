import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateTagDto {
  @ApiProperty({
    example: 'react',
    description: 'Is a tag populer or content of post',
    uniqueItems: true,
    nullable: false,
  })
  @Expose({ name: 'name' })
  name: string;
}
