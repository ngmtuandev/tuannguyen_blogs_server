import { Entity, Column } from 'typeorm';
import { GenericEntity } from './generic.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class SessionCodeEntity extends GenericEntity {
  @Column({ name: 'code' })
  @IsNotEmpty()
  code: number;

  @Column({ name: 'data' })
  @IsNotEmpty()
  data: string;
}
