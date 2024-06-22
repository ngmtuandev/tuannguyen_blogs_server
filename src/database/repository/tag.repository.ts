import { EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { TagEntity } from '../entity';
import { CreateTagDto } from 'src/infrastructure/dto';
import { PaginationFilter } from 'src/common/dto';

export class TagRepository extends GenericRepository<TagEntity> {
  protected repository: Repository<TagEntity>;

  getEntityType(): EntityTarget<TagEntity> {
    return TagEntity;
  }

  async create(tagInfo: CreateTagDto) {
    const result = await this.repository.save(tagInfo);
    return result;
  }

  async deleteById(id: number) {
    const result = await this.repository.delete(id);
    return result;
  }

  async findTagById(id: number) {
    const tagsResult = await this.repository.findOneBy({ id });
    return tagsResult;
  }
}
