import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CommentEntity } from 'src/database/entity';
import {
  CommentRepository,
  NotificationRepository,
  PostRepository,
  UserRepository,
} from 'src/database/repository';
import {
  CommentDto,
  CreateCommentDto,
  CreateNotificationDto,
  FindCommentDto,
  UpdateCommentDto,
} from 'src/infrastructure/dto';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostRepository,
    private readonly notificationRepository: NotificationRepository,
    private readonly dataSource: DataSource,
  ) {}

  async create(commentInfo: CreateCommentDto, req: any) {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.userRepository.findUserById(req.userInfo.sub);
      if (!user) {
        throw new BadRequestException('User not found');
      }

      const post = await this.postRepository.findByIdNotLanguage(
        commentInfo.post,
      );
      if (!post) {
        throw new BadRequestException('Post not found');
      }

      const parentId = commentInfo?.parentId || 0;

      const newComment = queryRunner.manager.create(CommentEntity, {
        ...commentInfo,
        parentId,
        user,
        post,
      });

      const result = await this.commentRepository.create(
        queryRunner.manager,
        newComment,
      );

      const findComment =
        await this.commentRepository.findCommentById(parentId);

      if (
        parentId !== 0 &&
        findComment &&
        findComment.user.id != req.userInfo.sub
      ) {
        const notificationInfo = plainToClass(CreateNotificationDto, {
          message: `Bạn có thông báo từ ${user.email} của bài đăng ${post.id}`,
          user: findComment.user,
          comment: findComment,
          postId: post.id,
          post: post,
        });

        await this.notificationRepository.create(
          queryRunner.manager,
          notificationInfo,
        );
        // throw Error();
      }

      await queryRunner.commitTransaction();

      const resultConvertDto = this.toCommentDto(result);
      return resultConvertDto;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Failed to create comment');
    } finally {
      await queryRunner.release();
    }
  }

  async findCommentOfPost(findCommentInfo: FindCommentDto) {
    const result = await this.commentRepository.findCommentOfPost(
      findCommentInfo?.postId,
      findCommentInfo?.parentId,
    );
    return result;
  }

  toCommentDto(comment: CommentEntity): CommentDto {
    return {
      id: comment.id,
      text: comment.text,
      like: comment.like,
      parentId: comment.parentId,
      createdAt: comment.createdAt,
      user: {
        id: comment.user.id,
        userName: comment.user.userName,
      },
      post: {
        id: comment.post.id,
      },
    };
  }

  async likeCommentById(commentId: number) {
    const response = await this.commentRepository.likeCommentById(commentId);
    return response;
  }

  async deleteById(commentId: number) {
    const result = await this.commentRepository.deleteRecursive(commentId);
    return result;
  }

  async updateById(updateCommentInfo: UpdateCommentDto, req: any) {
    const dataUpdate = { ...updateCommentInfo, userId: req.userInfo.sub };
    const result = await this.commentRepository.updateCommentById(dataUpdate);
    return result;
  }
}
