import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreatePostTranslationDto } from './create-post-translation.dto';

export class PostDto {
  @IsOptional()
  view?: number | null = 0;

  @IsOptional()
  like?: number | null = 0;

  @IsOptional()
  thumbnail?: string | null = '';
}
