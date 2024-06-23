import { Injectable } from '@nestjs/common';
import { PostEmotionRepository } from 'src/database/repository';
import { CreatePostEmotionDto } from 'src/infrastructure/dto';

@Injectable()
export class PostEmotionService {
  constructor(private readonly postEmotionRepository: PostEmotionRepository) {}

  async create(postEmotionInfo: CreatePostEmotionDto, req: any) {
    const dataPostEmotionInfo = { ...postEmotionInfo, user: req.userInfo.sub };
    const result = this.postEmotionRepository.create(dataPostEmotionInfo);
    return result;
  }

  async findAllEmotionOfOnePost(postId: number) {
    const result =
      await this.postEmotionRepository.findAllEmotionOfOnePost(postId);
    return result;
  }

  async findDetailOneEmotionOfOnePost(postId: number, emotionId: number) {
    const result =
      await this.postEmotionRepository.findDetailOneEmotionOfOnePost(
        postId,
        emotionId,
      );
    return result;
  }
}
