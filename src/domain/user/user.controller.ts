import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/infrastructure/dto';
import { UserService } from './user.service';
import { ApiBadRequestResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { messageApi, Response } from 'src/common/constant';
import { ROLE_CODE, STATUS_CODE } from 'src/infrastructure/enum';
import { IdDto } from 'src/common/dto';
import { AuthGuard } from '../guard';
import { PublicAuth, Roles } from 'src/common/decorators';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @PublicAuth()
  @ApiOperation({
    summary: 'Api register new users',
  })
  @ApiBadRequestResponse({ description: 'Register failure' })
  @Post('register')
  async register(@Body() userInfo: CreateUserDto) {
    try {
      const result = await this.userService.register(userInfo);
      return new Response(
        STATUS_CODE.SUCCESS,
        result,
        messageApi.SUCCESS,
        undefined,
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

  @ApiOperation({
    summary: 'Api get list user',
  })
  @ApiBadRequestResponse({ description: 'Get list user failure' })
  @Get('get-detail')
  async getDetail(@Body() id: IdDto) {
    try {
      const result = await this.userService.getDetail(id);
      return new Response(
        STATUS_CODE.SUCCESS,
        result,
        messageApi.SUCCESS,
        undefined,
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

  @Roles(ROLE_CODE.Admin)
  @ApiOperation({
    summary: 'Delete one user by id',
  })
  @ApiBadRequestResponse({ description: 'Delete user failure' })
  @Delete()
  async delete(@Body() id: IdDto) {
    try {
      await this.userService.delete(id);
      return new Response(
        STATUS_CODE.SUCCESS,
        undefined,
        messageApi.SUCCESS,
        undefined,
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
