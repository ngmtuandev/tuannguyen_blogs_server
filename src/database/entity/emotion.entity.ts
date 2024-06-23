import { Entity, Column, OneToMany } from 'typeorm';
import { GenericEntity } from './generic.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { EMOTION_ICON } from 'src/infrastructure/enum';
import { PostEmotionEntity } from './post-emotion.entity';

@Entity()
export class EmotionEntity extends GenericEntity {
  @Column({ name: 'emotion_icon' })
  @IsNotEmpty()
  emotionIcon: EMOTION_ICON

  @Column({ name: 'text' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @OneToMany(() => PostEmotionEntity, postEmotion => postEmotion.emotion)
  postEmotions: PostEmotionEntity[];
}
