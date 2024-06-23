import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PublicAuth, Roles } from 'src/common/decorators';
import { CreateEmotionDto } from 'src/infrastructure/dto';
import { ROLE_CODE, STATUS_CODE } from 'src/infrastructure/enum';
import { EmotionService } from './emotion.service';
import { messageApi, Response } from 'src/common/constant';

@Controller('emotion')
export class EmotionController {
  constructor(private readonly emotionService: EmotionService) {}

  @Roles(ROLE_CODE.Admin)
  @Post()
  async create(@Body() emotionInfo: CreateEmotionDto) {
    try {
      const result = await this.emotionService.create(emotionInfo);
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

  @Roles(ROLE_CODE.Admin)
  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.emotionService.deleteById(id);
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

  @PublicAuth()
  @Get('find-by-id/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.emotionService.findById(id);
      if (result) {
        return new Response(
          STATUS_CODE.SUCCESS,
          messageApi.SUCCESS,
          result,
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

  @PublicAuth()
  @Get('find-all')
  async findAll() {
    try {
      const result = await this.emotionService.findAll();
      if (result) {
        return new Response(
          STATUS_CODE.SUCCESS,
          messageApi.SUCCESS,
          result,
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
}
