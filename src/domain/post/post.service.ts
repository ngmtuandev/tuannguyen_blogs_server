import { Injectable } from '@nestjs/common';
import {
  PostRepository,
  PostTranslationRepository,
} from 'src/database/repository';
import { CreatePostTranslationDto, PostDto } from 'src/infrastructure/dto';
import { DataSource } from 'typeorm';
import { PostEntity, PostTranslationEntity } from 'src/database/entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PostService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly postRepository: PostRepository,
    private readonly postTranslationRepository: PostTranslationRepository,
  ) {}

  async create(postInfo: PostDto, postTransInfo: CreatePostTranslationDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const postNew = plainToClass(PostEntity, postInfo);
      const createPost = await this.postRepository.create(
        queryRunner.manager,
        postNew,
      );

      const postTransEn = plainToClass(PostTranslationEntity, {
        ...postTransInfo.dataEn,
        post: createPost.id,
      });

      const postTransVi = plainToClass(PostTranslationEntity, {
        ...postTransInfo.dataVi,
        post: createPost.id,
      });

      await this.postTranslationRepository.create(
        queryRunner.manager,
        postTransEn,
      );

      await this.postTranslationRepository.create(
        queryRunner.manager,
        postTransVi,
      );

      await queryRunner.commitTransaction();
      return createPost;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
