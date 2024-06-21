import { BadRequestException, Injectable } from '@nestjs/common';
import { IdDto } from 'src/common/dto';
import { UserRepository } from 'src/database/repository';
import { CreateUserDto, UserDto } from 'src/infrastructure/dto';
import { XFunction } from 'src/infrastructure/xhelper';
import { SendMailerService } from '../mailer';

@Injectable()
export class UserService {
  constructor(
    private readonly usersRepository: UserRepository,
    private sendMailerService: SendMailerService,
  ) {}

  async register(req: any, userInfo: CreateUserDto) {
    let response = undefined;

    const findUserExisted = await this.usersRepository.findUserByEmail(
      userInfo.email,
    );
    if (findUserExisted) throw new BadRequestException();

    const passwordHasded = await XFunction.hashPassword(userInfo.password);

    const data = { ...userInfo, password: passwordHasded };

    const codeConfirm = await this.sendMailerService.sendMailer(userInfo.email);
    req.session.register = { code: codeConfirm, info: data };

    if (codeConfirm) {
      response = true;
    }

    return response;
  }

  async confirm(req: any, code: any) {
    let response = undefined;
    const info = req.session.register;

    if (+code === +info?.code) {
      const result = await this.usersRepository.create(info?.info);
      if (result) {
        response = true;
      }
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
