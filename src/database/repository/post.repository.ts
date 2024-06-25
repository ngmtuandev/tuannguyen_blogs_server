import { EntityManager, EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { PostEntity } from '../entity';
import { FindPostDto, PostDto } from 'src/infrastructure/dto';
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
        WITH emotions AS (
            SELECT 
                pe."postId" AS post, 
                pe."emotionId" AS emotion, 
                COUNT(pe."emotionId") AS emotion_count
            FROM 
                public.post_emotions pe
            GROUP BY 
                pe."postId", pe."emotionId"
        ),
        pivoted_emotions AS (
            SELECT
                e.post,
                MAX(CASE WHEN e.emotion = 1 THEN e.emotion_count ELSE 0 END) AS emotion_1_count,
                MAX(CASE WHEN e.emotion = 2 THEN e.emotion_count ELSE 0 END) AS emotion_2_count,
                MAX(CASE WHEN e.emotion = 3 THEN e.emotion_count ELSE 0 END) AS emotion_3_count
            FROM 
                emotions e
            GROUP BY 
                e.post
        )
        SELECT 
            p.id AS postId, 
            p.created_at AS createdAt, 
            p.view AS view, 
            p.thumbnail AS thumbnail, 
            pt.id AS transId, 
            pt.title AS title, 
            pt.content_description AS description, 
            pt.language_code AS languageCode, 
            t.id AS tagId, 
            t.name AS tagName,
            pe.emotion_1_count,
            pe.emotion_2_count,
            pe.emotion_3_count
        FROM 
            public.post_entity p
        LEFT JOIN 
            public.post_translation_entity pt ON p.id = pt."postId"
        LEFT JOIN 
            public.tag_post tp ON tp.post_id = p.id
        JOIN 
            public.tag_entity t ON t.id = tp.tag_id
        LEFT JOIN 
            pivoted_emotions pe ON pe.post = p.id
        WHERE 
            pt.language_code ILIKE $1
            AND p.is_delete = false
      `;

      const params: any[] = [`${languageCode}`];
      let paramIndex = 2;

      if (tagsId) {
        mainQuery += ` AND tp.tag_id = $${paramIndex}`;
        params.push(tagsId);
        paramIndex++;
      }

      if (title) {
        mainQuery += ` AND pt.title ILIKE $${paramIndex}`;
        params.push(`%${title}%`);
        paramIndex++;
      }

      const offset = (page - 1) * limit;
      mainQuery += ` ORDER BY p.id ASC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
      params.push(limit, offset);

      const results = await this.repository.query(mainQuery, params);

      let nextQuery = `
        SELECT COUNT(DISTINCT p.id) AS total
        FROM public.post_entity p
        LEFT JOIN public.post_translation_entity pt ON p.id = pt."postId"
        LEFT JOIN public.tag_post tp ON tp.post_id = p.id
        JOIN public.tag_entity t ON t.id = tp.tag_id
        WHERE pt.language_code ILIKE $1 AND p.is_delete = false
      `;

      const countParams: any[] = [`${languageCode}`];
      paramIndex = 2;

      if (tagsId) {
        nextQuery += ` AND tp.tag_id = $${paramIndex}`;
        countParams.push(tagsId);
        paramIndex++;
      }

      if (title) {
        nextQuery += ` AND pt.title ILIKE $${paramIndex}`;
        countParams.push(`%${title}%`);
      }

      const countResult = await this.repository.query(nextQuery, countParams);
      const total = parseInt(countResult[0].total, 10);
      const hasNextPage = offset + limit < total;

      const pagination = new PaginationInfinityDto();
      pagination.hasNextPage = hasNextPage;
      pagination.results = results;
      pagination.nextPageToken = hasNextPage ? page + 1 : null;
      return pagination;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Executing the query failed.');
    }
  }

  async findById(id: number, language: string) {
    let query = `
      SELECT DISTINCT ON (p.id)  p.*, 
      pt.id AS post_translation_id, 
      pt.content, 
      pt.title, 
      pt.content_description, 
      pt.language_code, 
      tp.tag_id FROM post_entity p 
      LEFT JOIN post_translation_entity pt ON p.id = pt."postId"
      LEFT JOIN tag_post tp ON tp.post_id = p.id 
      WHERE p.id = ${id} AND p.is_delete IS false AND pt.language_code LIKE '${language}'
    `;

    await this.updateView(id);

    const results = await this.repository.query(query);
    return results;
  }

  async updateView(id: number) {
    const post = await this.repository.findOneBy({ id });
    if (post) {
      await this.repository.update(id, { view: post.view + 1 });
    }
  }

  async findByIdNotLanguage(id: number) {
    const result = await this.repository.findOneBy({ id });
    return result;
  }
}
