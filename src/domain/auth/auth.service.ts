import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/database/repository';
import { LoginUserDto } from 'src/infrastructure/dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(loginInfo: LoginUserDto) {
    let accessToken = undefined;
    const findUserLogin = await this.userRepository.findUserByEmail(
      loginInfo.email,
    );
    if (findUserLogin) {
      const isMatchPassword = await bcrypt.compare(
        loginInfo.password,
        findUserLogin.password,
      );

      if (!isMatchPassword) {
        throw new UnauthorizedException();
      }

      const payload = {
        sub: findUserLogin.id,
        userName: findUserLogin.userName,
        role: findUserLogin.role,
      };

      accessToken = await this.jwtService.signAsync(payload);
    }
    return accessToken;
  }
}
