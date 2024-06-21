import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/infrastructure/dto';
import { AuthService } from './auth.service';
import { STATUS_CODE } from 'src/infrastructure/enum';
import { messageApi, Response } from 'src/common/constant';
import { PublicAuth } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicAuth()
  @Post('login')
  async login(@Body() loginInfo: LoginUserDto) {
    try {
      const accessToken = await this.authService.login(loginInfo);
      return new Response(
        STATUS_CODE.SUCCESS,
        undefined,
        undefined,
        accessToken,
        true,
      );
    } catch (error) {
      return new Response(
        STATUS_CODE.FAILURE,
        null,
        messageApi.FAIL,
        undefined,
        false,
      );
    }
  }
}
