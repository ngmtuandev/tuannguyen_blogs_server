import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { GenericEntity } from './generic.entity';
import { IsOptional } from 'class-validator';
import { PostTranslationEntity } from './post-translation.entity';
import { TagEntity } from './tag.entity';
import { EmotionEntity } from './emotion.entity';
import { PostEmotionEntity } from './post-emotion.entity';
import { CommentEntity } from './comment.entity';
import { NotificationEntity } from './notification.entity';

@Entity()
export class PostEntity extends GenericEntity {
  @Column({ name: 'view' })
  view: number | null = 0;

  @Column({ name: 'thumbnail' })
  @IsOptional()
  thumbnail?: string;

  @Column({ name: 'is_delete' })
  @IsOptional()
  isDelete: boolean | null = false;

  @OneToMany(
    () => PostTranslationEntity,
    (postTranslation) => postTranslation.post,
  )
  postTranslations: PostTranslationEntity[];

  @ManyToMany(() => TagEntity, (tag) => tag.posts)
  tags?: TagEntity[];

  @OneToMany(() => PostEmotionEntity, (postEmotion) => postEmotion.post)
  postEmotions: PostEmotionEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comment: CommentEntity;

  @OneToMany(() => NotificationEntity, (notification) => notification.comment)
  notifications: NotificationEntity[];
}
