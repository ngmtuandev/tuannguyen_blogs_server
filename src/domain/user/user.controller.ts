import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/infrastructure/dto';
import { UserService } from './user.service';
import { ApiBadRequestResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { messageApi, Response } from 'src/common/constant';
import { STATUS_CODE } from 'src/infrastructure/enum';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Api register new users',
  })
  @ApiBadRequestResponse({ description: 'Register failure' })
  @Post()
  async register(@Body() userInfo: CreateUserDto) {
    let response = new Response(
      STATUS_CODE.FAILURE,
      undefined,
      undefined,
      undefined,
      false,
    );

    try {
      const result = await this.userService.register(userInfo);
      response.data = result;
      response.message = messageApi.SUCCESS;
      response.status = true;
      response.statusCode = STATUS_CODE.SUCCESS;
    } catch (error) {
      response.message = messageApi.FAIL;
      response.status = false;
      response.statusCode = STATUS_CODE.FAILURE;
    }
    
    return response;
  }

  @ApiOperation({
    summary: 'Api get list user',
  })
  @ApiBadRequestResponse({ description: 'Get list user failure' })
  @Get()
  async getAll() {
    this.userService.getAll();
  }
}
