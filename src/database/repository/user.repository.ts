import { EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { UserEntity } from '../entity';
import { CreateUserDto } from 'src/infrastructure/dto';
import { IdDto } from 'src/common/dto';

export class UserRepository extends GenericRepository<UserEntity> {
  protected repository: Repository<UserEntity>;

  getEntityType(): EntityTarget<UserEntity> {
    return UserEntity;
  }

  async create(userInfo: CreateUserDto) {
    const result = await this.repository.save(userInfo);
    return result;
  }

  async findUserByEmail(email: string) {
    const result = await this.repository.findOne({ where: { email } });
    return result;
  }

  async findUserById(id: IdDto) {
    const result = await this.repository.findOne({ where: { id: id.id } });
    return result;
  }

  async deleteUserById(id: IdDto) {
    const result = await this.repository.delete(id.id);
    console.log('result delete : ', result);
    return result;
  }
}
