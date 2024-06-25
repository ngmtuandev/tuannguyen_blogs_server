import { Injectable, Logger } from '@nestjs/common';
import {
  PostRepository,
  PostTranslationRepository,
  TagRepository,
} from 'src/database/repository';
import {
  CreatePostTranslationDto,
  FindPostDto,
  PostDto,
  PostResponseDto,
  UpdatePostTranslationDto,
} from 'src/infrastructure/dto';
import { DataSource } from 'typeorm';
import { PostEntity, PostTranslationEntity } from 'src/database/entity';
import { plainToClass } from 'class-transformer';
import { XFunction } from 'src/infrastructure/xhelper';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);
  constructor(
    private readonly dataSource: DataSource,
    private readonly postRepository: PostRepository,
    private readonly postTranslationRepository: PostTranslationRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  async create(postInfo: PostDto, postTransInfo: CreatePostTranslationDto) {
    let response = undefined;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const postNew = plainToClass(PostEntity, postInfo);
      if (postInfo.tags && postInfo.tags.length > 0) {
        const tags = await this.tagRepository.findByIds(postInfo.tags);
        postNew.tags = tags;
      }
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

      response = true;

      return response;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return response;
    } finally {
      await queryRunner.release();
    }
  }

  async deleteById(id: number) {
    return await this.postRepository.deleteById(id);
  }

  async findAllFilter(findInfo: FindPostDto) {
    const result = await this.postRepository.findAllFilter(findInfo);
    return result;
  }

  async findById(id: number, language: string) {
    const resultEntity = await this.postRepository.findById(id, language);

    const resultConvertToDto = XFunction.convertEntityTo(
      resultEntity,
      PostResponseDto,
    );
    return resultConvertToDto;
  }

  async updateById(postTransId: number, updateInfo: UpdatePostTranslationDto) {
    let response = undefined;
    const findPostUpdate = this.postTranslationRepository.findById(postTransId);
    if (findPostUpdate) {
      const updatePost = this.postTranslationRepository.updateById(
        postTransId,
        updateInfo,
      );
      if (updatePost) response = true;
    }
    return response;
  }
}
