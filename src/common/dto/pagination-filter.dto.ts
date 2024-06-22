import { Expose } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export abstract class PaginationFilter {
  @Expose({ name: 'page' })
  @IsNumber()
  @IsOptional()
  page?: number;

  @Expose({ name: 'limit' })
  @IsNumber()
  @IsOptional()
  limit?: number;

  @Expose({ name: 'sort' })
  @IsOptional()
  sort?: string;

  @Expose({ name: 'sort_by' })
  @IsOptional()
  sortBy: string;
}
