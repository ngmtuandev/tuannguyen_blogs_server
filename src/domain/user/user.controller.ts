import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/infrastructure/dto';
import { UserService } from './user.service';
import { ApiBadRequestResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { messageApi, Response } from 'src/common/constant';
import { ROLE_CODE, STATUS_CODE } from 'src/infrastructure/enum';
import { IdDto } from 'src/common/dto';
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
  async register(@Req() req: any, @Body() userInfo: CreateUserDto) {
    try {
      const result = await this.userService.register(req, userInfo);
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

  @PublicAuth()
  @ApiOperation({
    summary: 'Api confirm email when register new users',
  })
  @ApiBadRequestResponse({ description: 'Confirm Register failure' })
  @Post('confirm')
  async confirm(@Req() req: any, @Body('code') code: any) {
    try {
      const result = await this.userService.confirm(req, code);
      if (result) {
        return new Response(
          STATUS_CODE.SUCCESS,
          undefined,
          messageApi.SUCCESS,
          undefined,
          true,
        );
      }
      return new Response(
        STATUS_CODE.FAILURE,
        undefined,
        messageApi.FAIL,
        undefined,
        false,
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
