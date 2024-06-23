import { IsOptional, IsString } from 'class-validator';

export class UpdatePostTranslationDto {
  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  contentDescription?: string;
}
