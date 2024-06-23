import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import {
  CommentRepository,
  PostRepository,
  UserRepository,
} from 'src/database/repository';
import { CommentService } from './comment.service';

@Module({
  providers: [
    CommentRepository,
    CommentService,
    UserRepository,
    PostRepository,
  ],
  controllers: [CommentController],
  exports: [],
  imports: [],
})
export class CommentModule {}
