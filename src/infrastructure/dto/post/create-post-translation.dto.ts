import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreatePostTranslationViDto } from './create-post-translation-vi.dto';
import { CreatePostTranslationEnDto } from './create-post-translation-en.dto';

export class CreatePostTranslationDto {
  @IsNotEmpty()
  dataVi?: CreatePostTranslationViDto;

  @IsNotEmpty()
  dataEn?: CreatePostTranslationEnDto;
}
