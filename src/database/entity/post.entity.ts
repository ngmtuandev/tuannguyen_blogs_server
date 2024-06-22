import { Entity, Column, OneToMany } from 'typeorm';
import { GenericEntity } from './generic.entity';
import { IsOptional } from 'class-validator';
import { PostTranslationEntity } from './post-translation.entity';

@Entity()
export class PostEntity extends GenericEntity {
  @Column({ name: 'view' })
  view: number | null = 0;

  @Column({name: 'like'})
  @IsOptional()
  like?: number | null = 0;

  @Column({name: 'thumbnail'})
  @IsOptional()
  thumbnail?: string;

  @OneToMany(() => PostTranslationEntity, (postTranslation) => postTranslation.post)
  postTranslations: PostTranslationEntity[]
}
