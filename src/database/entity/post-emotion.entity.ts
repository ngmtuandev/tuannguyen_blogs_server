import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './post.entity';
import { EmotionEntity } from './emotion.entity';
import { UserEntity } from './user.entity';

@Entity('post_emotions')
export class PostEmotionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PostEntity, post => post.postEmotions)
  post: PostEntity;

  @ManyToOne(() => EmotionEntity, emotion => emotion.postEmotions)
  emotion: EmotionEntity;

  @ManyToOne(() => UserEntity, user => user.postEmotions)
  user: UserEntity;
}
