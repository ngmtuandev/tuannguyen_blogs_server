import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { GenericEntity } from './generic.entity';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserEntity } from './user.entity';
import { PostEntity } from './post.entity';
import { NotificationEntity } from './notification.entity';

@Entity()
export class CommentEntity extends GenericEntity {
  @Column({ name: 'text' })
  @IsNotEmpty()
  text: string;

  @Column({ name: 'like' })
  like: number | null = 0;

  @Column({ name: 'parent_id' })
  @IsOptional()
  parentId: number;

  @ManyToOne(() => UserEntity, (user) => user.comment)
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.comment)
  post: PostEntity;

  @OneToMany(() => NotificationEntity, (notification) => notification.comment)
  notifications: NotificationEntity[];
}
