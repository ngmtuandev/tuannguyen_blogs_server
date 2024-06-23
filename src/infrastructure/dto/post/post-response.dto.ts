import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostResponseDto {
  @Expose({name: 'post_id'})
  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @Expose({name: 'tag_id'})
  @IsNotEmpty()
  @IsNumber()
  tagId: number;

  @Expose({name: 'language_code'})
  @IsNotEmpty()
  @IsString()
  languageCode: string;

  @Expose({name: 'content_description'})
  @IsNotEmpty()
  @IsString()
  contentDescription: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  content: string;

  @Expose()
  @IsString()
  thumbnail: string;

  @Expose()
  @IsNumber()
  like: number;

  @Expose()
  @IsNumber()
  view: number;

  @Expose({name: 'created_at'})
  @IsString()
  createdAt: string;

  @Expose({name: 'post_translation_id'})
  postTranslationId: string;
}
