import { EntityManager, EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { PostTranslationEntity } from '../entity';

export class PostTranslationRepository extends GenericRepository<PostTranslationEntity> {
  protected repository: Repository<PostTranslationEntity>;

  getEntityType(): EntityTarget<PostTranslationEntity> {
    return PostTranslationEntity;
  }

  async create(transactionManager: EntityManager, postTransInfo: any) {
    const newPostTrans = transactionManager.create(PostTranslationEntity, postTransInfo);
    return await transactionManager.save(PostTranslationEntity, newPostTrans);
  }
}
