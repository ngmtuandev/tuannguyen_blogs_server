import { IsNotEmpty, IsString } from 'class-validator';
import { LANGUAGE_CODE } from 'src/infrastructure/enum';

export class CreatePostTranslationEnDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  contentDescription?: string;

  languageCode: LANGUAGE_CODE.ENG;
}
