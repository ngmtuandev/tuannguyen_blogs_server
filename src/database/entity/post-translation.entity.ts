import { Entity, Column, ManyToOne } from 'typeorm';
import { GenericEntity } from './generic.entity';
import { IsOptional } from 'class-validator';
import { PostEntity } from './post.entity';
import { LANGUAGE_CODE } from 'src/infrastructure/enum';

@Entity()
export class PostTranslationEntity extends GenericEntity {
  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'title' })
  @IsOptional()
  title?: string;

  @Column({ name: 'content_description' })
  @IsOptional()
  contentDescription?: string;

  @Column({ name: 'language_code' })
  languageCode: LANGUAGE_CODE;

  @ManyToOne(() => PostEntity, (post) => post.postTranslations)
  post: PostEntity;
}
