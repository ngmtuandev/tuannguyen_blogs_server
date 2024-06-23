import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCommentDto {
  @IsNotEmpty()
  commentId: number;

  @IsNotEmpty()
  updateInfo: string;
}
