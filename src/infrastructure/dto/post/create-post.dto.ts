import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreatePostTranslationDto } from './create-post-translation.dto';
import { PostDto } from './post.dto';

export class CreatePostDto {
  @IsNotEmpty()
  post: PostDto;

  @IsNotEmpty()
  postTrans: CreatePostTranslationDto;
}
