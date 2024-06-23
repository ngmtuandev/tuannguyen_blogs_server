import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
} from '@nestjs/common';
import { PostEmotionService } from './post-emotion.service';
import { STATUS_CODE } from 'src/infrastructure/enum';
import { messageApi, Response } from 'src/common/constant';
import { CreatePostEmotionDto } from 'src/infrastructure/dto';
import { PublicAuth } from 'src/common/decorators';

@Controller('post-emotion')
export class PostEmotionController {
  constructor(private readonly postEmotionService: PostEmotionService) {}

  @Post()
  async create(
    @Body() postEmotionInfo: CreatePostEmotionDto,
    @Request() req: Request,
  ) {
    try {
      const result = await this.postEmotionService.create(postEmotionInfo, req);
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
  @Get(':id')
  async findAllEmotionOfOnePost(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.postEmotionService.findAllEmotionOfOnePost(id);
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
  @Get('find-detail-emotion/:postId/:emotionId')
  async findDetailOneEmotionOfOnePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('emotionId', ParseIntPipe) emotionId: number,
  ) {
    try {
      const result =
        await this.postEmotionService.findDetailOneEmotionOfOnePost(
          postId,
          emotionId,
        );
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
