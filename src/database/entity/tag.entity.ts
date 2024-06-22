import { Entity, Column } from 'typeorm';
import { GenericEntity } from './generic.entity';

@Entity()
export class TagEntity extends GenericEntity {
  @Column({ name: 'name' })
  name: string;
}
