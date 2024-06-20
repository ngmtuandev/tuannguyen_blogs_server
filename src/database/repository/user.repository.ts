import { EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { UserEntity } from '../entity';
import { CreateUserDto } from 'src/infrastructure/dto';

export class UserRepository extends GenericRepository<UserEntity> {
  protected repository: Repository<UserEntity>;

  getEntityType(): EntityTarget<UserEntity> {
    return UserEntity;
  }

  async create(userInfo: CreateUserDto) {
    const result = await this.repository.save(userInfo);
    return result;
  }
}
