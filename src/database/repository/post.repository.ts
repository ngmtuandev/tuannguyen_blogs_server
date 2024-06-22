import { EntityManager, EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { PostEntity } from '../entity';
import { PostDto } from 'src/infrastructure/dto';

export class PostRepository extends GenericRepository<PostEntity> {
  protected repositoryPost: Repository<PostEntity>;

  getEntityType(): EntityTarget<PostEntity> {
    return PostEntity;
  }

  async create(transactionManager: EntityManager, postInfo: PostDto) {
    const newPost = transactionManager.create(PostEntity, postInfo);
    return await transactionManager.save(PostEntity, newPost);
  }
}
