import { EntityManager, EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { PostTranslationEntity } from '../entity';
import { UpdatePostTranslationDto } from 'src/infrastructure/dto';

export class PostTranslationRepository extends GenericRepository<PostTranslationEntity> {
  protected repository: Repository<PostTranslationEntity>;

  getEntityType(): EntityTarget<PostTranslationEntity> {
    return PostTranslationEntity;
  }

  async create(transactionManager: EntityManager, postTransInfo: any) {
    const newPostTrans = transactionManager.create(
      PostTranslationEntity,
      postTransInfo,
    );
    return await transactionManager.save(PostTranslationEntity, newPostTrans);
  }

  async findById(id: number) {
    return await this.repository.findBy({ id });
  }

  async updateById(postTransId: number, updateInfo: UpdatePostTranslationDto) {
    const result = await this.repository.update(postTransId, { ...updateInfo });
    return result;
  }
}
