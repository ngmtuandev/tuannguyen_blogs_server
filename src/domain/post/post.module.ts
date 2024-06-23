import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import {
  PostRepository,
  PostTranslationRepository,
  TagRepository,
} from 'src/database/repository';
import { PostEntity, PostTranslationEntity } from 'src/database/entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PostController],
  providers: [PostService, PostRepository, PostTranslationRepository, TagRepository],
  imports: [TypeOrmModule.forFeature([PostEntity, PostTranslationEntity])],
  exports: [],
})
export class PostModule {}
