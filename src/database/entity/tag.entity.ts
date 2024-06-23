import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { GenericEntity } from './generic.entity';
import { PostEntity } from './post.entity';

@Entity()
export class TagEntity extends GenericEntity {
  @Column({ name: 'name' })
  name: string;

  @ManyToMany(
    () => PostEntity,
    post => post.tags,
  )
  @JoinTable({
    name: 'tag_post',
    joinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'post_id',
      referencedColumnName: 'id'
    }
  })
  posts?: PostEntity[]
}
