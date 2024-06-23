import { IsNotEmpty, IsOptional } from 'class-validator';
import { PostEntity, UserEntity } from 'src/database/entity';

export class CreateCommentDto {
  @IsNotEmpty()
  text: string;

  @IsOptional()
  parentId?: number | undefined;

  @IsNotEmpty()
  post: number;
}
