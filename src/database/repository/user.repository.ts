import { EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { UserEntity } from '../entity';
import {
  CreateUserDto,
  UpdatePasswordDto,
  UpdateUserDto,
} from 'src/infrastructure/dto';
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

  async findUserById(id: number) {
    const result = await this.repository.findOneBy({ id });
    return result;
  }

  async deleteUserById(id: IdDto) {
    const result = await this.repository.delete(id.id);
    return result;
  }

  async updatePasswordById(userId: number, password: string) {
    const result = this.repository.update(userId, {
      password: password,
    });
    return result;
  }

  async updateUserById(userId: number, updateInfo: UpdateUserDto) {
    const result = this.repository.update(userId, {
      ...updateInfo,
    });
    return result;
  }
}
