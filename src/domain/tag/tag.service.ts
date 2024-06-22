import { Injectable } from '@nestjs/common';
import { PaginationFilter } from 'src/common/dto';
import { TagRepository } from 'src/database/repository';
import { CreateTagDto, TagDto } from 'src/infrastructure/dto';
import { XFunction } from 'src/infrastructure/xhelper';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async create(tagInfo: CreateTagDto) {
    const response = this.tagRepository.create(tagInfo);
    return response;
  }

  async deleteById(id: number) {
    const response = this.tagRepository.deleteById(id);
    return response;
  }

  async findById(id: number) {
    let response = undefined;
    const result = this.tagRepository.findTagById(id);
    if (result) response = XFunction.convertEntityTo(result, TagDto);
    return response;
  }

  async findAll(findInfo: PaginationFilter) {
    let tagFindInfo = undefined;
    const [result, totalCount] = await this.tagRepository.paginate(findInfo);
    if (result) {
      tagFindInfo = await XFunction.convertEntityTo(result, TagDto);
    }
    return {
      data: tagFindInfo,
      total: totalCount,
    };
  }
}
