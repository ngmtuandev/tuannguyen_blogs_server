import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import {
  CreatePostDto,
  FindPostDto,
  UpdatePostTranslationDto,
} from 'src/infrastructure/dto';
import { PublicAuth, Roles } from 'src/common/decorators';
import { ROLE_CODE, STATUS_CODE } from 'src/infrastructure/enum';
import { messageApi, Response } from 'src/common/constant';
import { IdDto } from 'src/common/dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Roles(ROLE_CODE.Admin)
  @Post()
  async create(@Body() postCreateInfo: CreatePostDto) {
    try {
      const result = await this.postService.create(
        postCreateInfo.post,
        postCreateInfo.postTrans,
      );
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
  @Post('delete')
  async deleteById(@Body() id: IdDto) {
    try {
      const result = await this.postService.deleteById(id.id);
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
  @Get('find-all')
  async findAllFilter(@Body() findInfo: FindPostDto) {
    try {
      const result = await this.postService.findAllFilter(findInfo);
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
  @Get('find-by-id/:id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
    @Headers('language') language: string,
  ) {
    try {
      const result = await this.postService.findById(id, language);
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

  @Roles(ROLE_CODE.Admin)
  @Get('update-by-id/:id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostTranslationDto: UpdatePostTranslationDto,
  ) {
    try {
      const result = await this.postService.updateById(
        id,
        updatePostTranslationDto,
      );
      if (result) {
        return new Response(
          STATUS_CODE.SUCCESS,
          messageApi.SUCCESS,
          undefined,
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
