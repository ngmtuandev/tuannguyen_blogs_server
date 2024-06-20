import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/database/repository';
import { CreateUserDto, UserDto } from 'src/infrastructure/dto';
import { XFunction } from 'src/infrastructure/xhelper';

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepository) {}
  async register(userInfo: CreateUserDto) {
    let response = undefined;
    const passwordHasded = await XFunction.hashPassword(userInfo.password);

    const userRegister = { ...userInfo, password: passwordHasded };

    const result = await this.usersRepository.create(userRegister);
    if (result) {
      response = XFunction.convertEntityTo(result, UserDto);
    }

    return response;
  }

  async getAll() {}
}
