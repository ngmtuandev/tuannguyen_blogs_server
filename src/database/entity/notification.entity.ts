import { Entity, Column, ManyToOne } from 'typeorm';
import { GenericEntity } from './generic.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';
import { PostEntity } from './post.entity';

@Entity()
export class NotificationEntity extends GenericEntity {
  @Column({ name: 'is_read', default: false })
  @IsNotEmpty()
  isRead: Boolean;

  @Column({ name: 'message' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @Column({ name: 'postId' })
  postId: number;

  @ManyToOne(() => UserEntity, (user) => user.notifications)
  user: UserEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.notifications)
  comment: CommentEntity;

  @ManyToOne(() => PostEntity, (post) => post.notifications)
  post: PostEntity;
}
