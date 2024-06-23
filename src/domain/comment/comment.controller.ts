import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  CreateCommentDto,
  FindCommentDto,
  UpdateCommentDto,
} from 'src/infrastructure/dto';
import { STATUS_CODE } from 'src/infrastructure/enum';
import { messageApi, Response } from 'src/common/constant';
import { PublicAuth } from 'src/common/decorators';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() commentInfo: CreateCommentDto, @Request() req: Request) {
    try {
      const result = await this.commentService.create(commentInfo, req);
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
  @Get()
  async findCommentOfPost(@Body() findCommentInfo: FindCommentDto) {
    try {
      const result =
        await this.commentService.findCommentOfPost(findCommentInfo);
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

  @Patch()
  async likeCommentById(@Body('commentId') commentId: number) {
    try {
      const result = await this.commentService.likeCommentById(+commentId);
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

  @Put()
  async updateById(@Body() updateCommentInfo: UpdateCommentDto, @Request() req: Request) {
    try {
      const result = await this.commentService.updateById(updateCommentInfo, req);
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

  @Delete()
  async deleteById(@Body('commentId') commentId: number) {
    try {
      const result = await this.commentService.deleteById(+commentId);
      // TODO: implement transaction
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
