import { EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import {
  EmotionEntity,
  PostEmotionEntity,
  PostEntity,
  UserEntity,
} from '../entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostEmotionRepository extends GenericRepository<PostEmotionEntity> {
  protected repository: Repository<PostEmotionEntity>;

  getEntityType(): EntityTarget<PostEmotionEntity> {
    return PostEmotionEntity;
  }

  async create(postEmotionInfo: any) {
    const findEmotionUserOfPost = await this.findEmotioned(
      postEmotionInfo.post,
      postEmotionInfo.user,
    );

    if (
      findEmotionUserOfPost?.length > 0 &&
      +findEmotionUserOfPost[0].emotionId === +postEmotionInfo.emotion
    ) {
      this.repository.delete(findEmotionUserOfPost[0].id);
      return true;
    }

    if (
      findEmotionUserOfPost?.length > 0 &&
      +findEmotionUserOfPost.emotionId !== +postEmotionInfo.emotion
    ) {
      this.repository.update(findEmotionUserOfPost[0].id, {
        emotion: postEmotionInfo.emotion,
      });
      return true;
    }

    const postEmotion = new PostEmotionEntity();

    postEmotion.post = { id: postEmotionInfo.post } as PostEntity;
    postEmotion.emotion = { id: postEmotionInfo.emotion } as EmotionEntity;
    postEmotion.user = { id: postEmotionInfo.user } as UserEntity;

    return this.repository.save(postEmotion);
  }

  async findEmotioned(post: number, user: number) {
    let query = `SELECT * FROM post_emotions p WHERE p."postId" = ${post} AND p."userId" = ${user};`;

    const result = await this.repository.query(query);

    return result;
  }

  async findAllEmotionOfOnePost(postId: number) {
    let query = `SELECT post_emotions."emotionId", COUNT(*) AS count
                  FROM post_emotions 
                  WHERE post_emotions."postId" = ${postId}
                  GROUP BY post_emotions."emotionId";`;

    const result = await this.repository.query(query);

    return result;
  }

  async findDetailOneEmotionOfOnePost(postId: number, emotionId: number) {
    let query = `SELECT pe."emotionId" AS emotion, u.user_name AS user_name FROM post_emotions pe 
        LEFT JOIN user_entity u ON u.id = pe."userId" WHERE pe."postId" = ${postId} AND pe."emotionId" = ${emotionId};`;

    const result = await this.repository.query(query);

    return result;
  }
}
