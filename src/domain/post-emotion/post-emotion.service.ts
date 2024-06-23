import { Injectable } from '@nestjs/common';
import { PostEmotionRepository } from 'src/database/repository';
import { CreatePostEmotionDto } from 'src/infrastructure/dto';

@Injectable()
export class PostEmotionService {
  constructor(private readonly postEmotionRepository: PostEmotionRepository) {}

  async create(postEmotionInfo: CreatePostEmotionDto, req: any) {
    const data = { ...postEmotionInfo, user: req.userInfo.sub };
    const result = this.postEmotionRepository.create(data);
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
