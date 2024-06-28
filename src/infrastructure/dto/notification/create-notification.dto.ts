import { IsNotEmpty } from 'class-validator';
import { CommentEntity, UserEntity } from 'src/database/entity';

export class CreateNotificationDto {
  @IsNotEmpty()
  isRead: boolean | null = false;

  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  postId: any;

  @IsNotEmpty()
  user: UserEntity;

  @IsNotEmpty()
  comment: CommentEntity;
}
