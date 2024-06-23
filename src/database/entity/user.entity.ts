import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  IsNull,
  OneToMany,
} from 'typeorm';
import { GenericEntity } from './generic.entity';
import { ROLE_CODE } from 'src/infrastructure/enum';
import { PostEmotionEntity } from './post-emotion.entity';
import { CommentEntity } from './comment.entity';

@Entity()
export class UserEntity extends GenericEntity {
  @Column({ name: 'user_name' })
  userName: string;

  @Column({ default: ROLE_CODE.Client })
  role: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  password: string;

  @OneToMany(() => PostEmotionEntity, (postEmotion) => postEmotion.user)
  postEmotions: PostEmotionEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comment: CommentEntity;
}
