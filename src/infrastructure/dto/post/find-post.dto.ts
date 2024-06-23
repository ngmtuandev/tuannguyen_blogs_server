import { IsNotEmpty, IsOptional } from 'class-validator';
import { PaginationFilter } from 'src/common/dto';
import { LANGUAGE_CODE } from 'src/infrastructure/enum';

export class FindPostDto extends PaginationFilter {
  @IsOptional()
  title?: string;

  @IsOptional()
  tagsId?: number;

  @IsNotEmpty()
  languageCode: LANGUAGE_CODE;

}
