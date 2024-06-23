import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreatePostEmotionDto {
  @ApiProperty({
    example: '1',
    description: 'Id of post want emotion',
    uniqueItems: true,
    nullable: false,
  })
  @IsNotEmpty()
  post: number;

  @ApiProperty({
    example: '1',
    description: 'Emotion want express this post',
    nullable: false,
  })
  @IsNotEmpty()
  emotion: number;

}
