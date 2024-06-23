import { Injectable } from '@nestjs/common';
import { CommentEntity } from 'src/database/entity';
import {
  CommentRepository,
  PostRepository,
  UserRepository,
} from 'src/database/repository';
import {
  CommentDto,
  CreateCommentDto,
  FindCommentDto,
  UpdateCommentDto,
} from 'src/infrastructure/dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async create(commentInfo: CreateCommentDto, req: any) {
    const user = await this.userRepository.findUserById(req.userInfo.sub);
    const post = await this.postRepository.findByIdNotLanguage(
      commentInfo?.post,
    );

    const parentId = commentInfo?.parentId || 0;

    const newComment = Object.assign(new CommentEntity(), {
      ...commentInfo,
      parentId,
      user,
      post,
    });

    const result = await this.commentRepository.create(newComment);
    const resultConvertDto = this.toCommentDto(result);
    return resultConvertDto;
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
    return await this.commentRepository.likeCommentById(commentId);
  }

  async deleteById(commentId: number) {
    const result = await this.commentRepository.deleteRecursive(commentId);
  }

  async updateById(updateCommentInfo: UpdateCommentDto, req: any) {
    const dataUpdate = { ...updateCommentInfo, userId: req.userInfo.sub };
    const result =
      await this.commentRepository.updateCommentById(dataUpdate);
    return result;
  }
}
