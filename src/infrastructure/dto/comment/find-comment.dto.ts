import { IsNotEmpty } from 'class-validator';

export class FindCommentDto {
  @IsNotEmpty()
  postId: number;

  @IsNotEmpty()
  parentId: number;

}
