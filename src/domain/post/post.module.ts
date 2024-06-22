import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import {
  PostRepository,
  PostTranslationRepository,
} from 'src/database/repository';
import { PostEntity, PostTranslationEntity } from 'src/database/entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PostController],
  providers: [PostService, PostRepository, PostTranslationRepository],
  imports: [TypeOrmModule.forFeature([PostEntity, PostTranslationEntity])],
  exports: [],
})
export class PostModule {}
