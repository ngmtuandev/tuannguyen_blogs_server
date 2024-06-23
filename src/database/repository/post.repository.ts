import { EntityManager, EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { PostEntity } from '../entity';
import { FindPostDto, PostDto } from 'src/infrastructure/dto';
import { LANGUAGE_CODE } from 'src/infrastructure/enum';
import { PaginationInfinityDto } from 'src/common/dto';
import { Logger } from '@nestjs/common';

export class PostRepository extends GenericRepository<PostEntity> {
  protected repositoryPost: Repository<PostEntity>;
  private readonly logger = new Logger(PostRepository.name);

  getEntityType(): EntityTarget<PostEntity> {
    return PostEntity;
  }

  async create(transactionManager: EntityManager, postInfo: PostDto) {
    const newPost = transactionManager.create(PostEntity, postInfo);
    return await transactionManager.save(PostEntity, newPost);
  }

  async deleteById(id: number) {
    const result = await this.repository.update(id, { isDelete: true });
    return result;
  }

  async findAllFilter(findInfo: FindPostDto) {
    const { languageCode, tagsId, title, page, limit } = findInfo;

    try {
      let mainQuery = `
        SELECT 
          DISTINCT ON (p.id)
          p.id AS post_id, p.active AS post_active, p.created_at AS post_created_at, 
          p.view AS post_view, p.thumbnail AS post_thumbnail, 
          pt.id AS pt_id, pt.content AS pt_content, pt.title AS pt_title, 
          pt.content_description AS pt_content_description, pt.language_code AS pt_language_code, 
          t.id AS tag_id, t.name AS tag_name
        FROM 
          public.post_entity p
        LEFT JOIN 
          public.post_translation_entity pt ON p.id = pt."postId"
        LEFT JOIN 
          public.tag_post tp ON tp.post_id = p.id
        JOIN 
          public.tag_entity t ON t.id = tp.tag_id
        WHERE 
          pt.language_code ILIKE $1 
          AND p.is_delete = false
      `;

      const params = [`${languageCode}`];

      if (tagsId) {
        mainQuery += ` AND tp.tag_id = ${tagsId}`;
      }

      if (title) {
        mainQuery += ` AND pt.title ILIKE '%${title}%'`;
      }

      const offset = (page - 1) * limit;
      mainQuery += ` ORDER BY p.id ASC LIMIT ${limit} OFFSET ${offset}`;

      const results = await this.repository.query(mainQuery, params);

      let nextQuery = `
        SELECT COUNT(DISTINCT p.id) AS total
        FROM public.post_entity p
        LEFT JOIN public.post_translation_entity pt ON p.id = pt."postId"
        LEFT JOIN public.tag_post tp ON tp.post_id = p.id
        JOIN public.tag_entity t ON t.id = tp.tag_id
        WHERE pt.language_code ILIKE $1 AND p.is_delete = false
      `;

      if (tagsId) {
        nextQuery += ` AND tp.tag_id = ${tagsId}`;
      }

      if (title) {
        nextQuery += ` AND pt.title ILIKE '%${title}%'`;
      }

      const countResult = await this.repository.query(nextQuery, params);
      const total = parseInt(countResult[0].total, 10);
      const hasNextPage = offset + limit < total;

      const pagination = new PaginationInfinityDto();
      pagination.hasNextPage = hasNextPage;
      pagination.results = results;
      pagination.nextPageToken = hasNextPage ? page + 1 : null;
      return pagination;
    } catch (error) {
      this.logger.log(error);
      throw new Error('Executing the query failure.');
    }
  }
}
