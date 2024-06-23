import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class PaginationInfinityDto {
  @Expose({ name: 'results' })
  results: any;

  @Expose({ name: 'has_next_page' })
  @IsBoolean()
  @Transform(value => value === undefined ? false : value)
  hasNextPage: boolean | null = false;

  @Expose({ name: 'next_page_token' })
  @IsNumber()
  @Transform(value => value === undefined ? 0 : value)
  nextPageToken: number | null = 0;
}