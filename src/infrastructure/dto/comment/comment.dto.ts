import { IsOptional } from 'class-validator';
import { UserEntity } from 'src/database/entity';
import { PostEntity } from 'src/database/entity';

export class CommentDto {
  @IsOptional()
  id: number;

  @IsOptional()
  text: string;

  @IsOptional()
  like: number;

  @IsOptional()
  parentId: number;

  @IsOptional()
  createdAt: any;

  @IsOptional()
  user: Partial<UserEntity>;

  @IsOptional()
  post: Partial<PostEntity>;
}
