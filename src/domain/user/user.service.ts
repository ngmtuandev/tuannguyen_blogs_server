import { BadRequestException, Injectable } from '@nestjs/common';
import { IdDto } from 'src/common/dto';
import { SessionCodeRepository, UserRepository } from 'src/database/repository';
import {
  CreateSessionCodeDto,
  CreateUserDto,
  UpdatePasswordDto,
  UpdateUserDto,
  UserDto,
} from 'src/infrastructure/dto';
import { XFunction } from 'src/infrastructure/xhelper';
import { SendMailerService } from '../mailer';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    private readonly usersRepository: UserRepository,
    private sendMailerService: SendMailerService,
    private readonly sessionCodeRepository: SessionCodeRepository,
  ) {}

  async register(userInfo: CreateUserDto) {
    let response = undefined;

    const findUserExisted = await this.usersRepository.findUserByEmail(
      userInfo.email,
    );
    if (findUserExisted) throw new BadRequestException();

    const passwordHasded = await XFunction.hashPassword(userInfo.password);

    const data = { ...userInfo, password: passwordHasded };

    const codeConfirm = await this.sendMailerService.sendMailer(userInfo.email);
    const dataSessionCode = plainToClass(CreateSessionCodeDto, {
      code: codeConfirm,
      data: JSON.stringify(data),
    });
    const dataSession =
      await this.sessionCodeRepository.createSession(dataSessionCode);

    if (codeConfirm && dataSession) response = true;

    return response;
  }

  async confirm(code: any) {
    const dataInSession = await this.sessionCodeRepository.findSession(code);

    let response = undefined;
    const info = await JSON.parse(dataInSession?.data);

    if (+code === +dataInSession?.code) {
      const result = await this.usersRepository.create(info);
      if (result) {
        response = true;
        await this.sessionCodeRepository.deleteSession(dataInSession.id);
      }
    }
    return response;
  }

  async getDetail(id: IdDto) {
    let response = undefined;
    const user = await this.usersRepository.findUserById(id.id);

    if (user) response = XFunction.convertEntityTo(user, UserDto);
    return response;
  }

  async delete(id: IdDto) {
    const result = await this.usersRepository.deleteUserById(id);
    return result;
  }

  async updatePassword(updateInfo: UpdatePasswordDto) {
    let statusUpdate = undefined;
    const findUserExisted = await this.usersRepository.findUserById(
      updateInfo.id,
    );

    if (!findUserExisted) throw new BadRequestException();

    const isMatchPassword = await bcrypt.compare(
      updateInfo.password,
      findUserExisted.password,
    );

    if (isMatchPassword) {
      const newPasswordHasded = await XFunction.hashPassword(
        updateInfo.newPassword,
      );
      await this.usersRepository.updatePasswordById(
        updateInfo.id,
        newPasswordHasded,
      );
      statusUpdate = true;
    }

    return statusUpdate;
  }

  async update(updateInfo: UpdateUserDto) {
    let statusUpdate = undefined;
    const findUserExisted = await this.usersRepository.findUserById(
      updateInfo.id,
    );

    if (findUserExisted) {
      const result = await this.usersRepository.updateUserById(
        updateInfo.id,
        updateInfo,
      );
      if (result) statusUpdate = true;
    }
    return statusUpdate;
  }
}
