import { EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { EmotionEntity, TagEntity } from '../entity';
import { CreateEmotionDto } from 'src/infrastructure/dto';

export class EmotionRepository extends GenericRepository<EmotionEntity> {
  protected repository: Repository<EmotionEntity>;

  getEntityType(): EntityTarget<EmotionEntity> {
    return EmotionEntity;
  }

  async create(emotionInfo: CreateEmotionDto) {
    const result = await this.repository.save(emotionInfo);
    return result;
  }

  async deleteById(id: number) {
    const result = await this.repository.delete(id);
    return result;
  }

  async findById(id: number) {
    const result = await this.repository.findOneBy({ id });
    return result;
  }

  async findAll() {
    const result = await this.repository.find();
    return result;
  }
}
