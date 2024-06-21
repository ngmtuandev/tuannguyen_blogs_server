import { BadRequestException, Injectable } from '@nestjs/common';
import { IdDto } from 'src/common/dto';
import { UserRepository } from 'src/database/repository';
import { CreateUserDto, UserDto } from 'src/infrastructure/dto';
import { XFunction } from 'src/infrastructure/xhelper';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}
  async register(userInfo: CreateUserDto) {
    let response = undefined;

    const findUserExisted = await this.usersRepository.findUserByEmail(
      userInfo.email,
    );
    if (findUserExisted) throw new BadRequestException();

    const passwordHasded = await XFunction.hashPassword(userInfo.password);

    const userRegister = { ...userInfo, password: passwordHasded };

    const result = await this.usersRepository.create(userRegister);
    if (result) {
      response = XFunction.convertEntityTo(result, UserDto);
    }

    return response;
  }

  async getDetail(id: IdDto) {
    let response = undefined;
    const user = await this.usersRepository.findUserById(id);

    if (user) response = XFunction.convertEntityTo(user, UserDto);
    return response;
  }

  async delete(id: IdDto) {
    const result = await this.usersRepository.deleteUserById(id);
    return result;
  }
}
