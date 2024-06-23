import { DataSource, EntityManager, EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { CommentEntity } from '../entity';
import { UpdateCommentDto } from 'src/infrastructure/dto';

export class CommentRepository extends GenericRepository<CommentEntity> {
  protected repository: Repository<CommentEntity>;
  protected entityManager: EntityManager;

  constructor(dataSource: DataSource, entityManager: EntityManager) {
    super(dataSource);
    this.entityManager = entityManager;
  }
  getEntityType(): EntityTarget<CommentEntity> {
    return CommentEntity;
  }

  async create(commentInfo: any) {
    let response = undefined;
    try {
      const result = await this.repository.save(commentInfo);
      response = result;
    } catch (error) {
      response = undefined;
    }
    return response;
  }

  async findCommentOfPost(postId: number, parentId: number) {
    const comments = await this.repository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.post', 'p')
      .where('p.id = :postId', { postId })
      .andWhere('c.parentId = :parentId', { parentId })
      .getMany();

    return comments;
  }

  async findCommentById(commentId: number) {
    const comment = await this.repository.findOne({
      where: { id: commentId },
      relations: ['user', 'post'],
    });
    return comment;
  }

  async likeCommentById(commentId: number) {
    let response = undefined;
    const findCommentHandleLike = await this.findCommentById(commentId);
    if (findCommentHandleLike) {
      await this.repository.update(commentId, {
        like: +findCommentHandleLike[0].like + 1,
      });
      response = true;
    }
    return response;
  }

  async deleteRecursive(commentId: number): Promise<void> {
    await this.entityManager.transaction(async (transactionalEntityManager) => {
      await this.recursiveDelete(transactionalEntityManager, commentId);
    });
  }

  private async recursiveDelete(
    entityManager: EntityManager,
    commentId: any,
  ): Promise<void> {
    const comment = await entityManager.findOne(CommentEntity, commentId);
    if (!comment) {
      return;
    }

    await entityManager.delete(CommentEntity, commentId);

    const childComments = await entityManager.find(CommentEntity, {
      where: { parentId: commentId },
    });
    for (const childComment of childComments) {
      await this.recursiveDelete(entityManager, childComment.id);
    }
  }

  async updateCommentById(
    updateCommentInfo: UpdateCommentDto & { userId: number },
  ) {
    let resultUpdate = undefined;

    const { updateInfo, commentId, userId } = updateCommentInfo;

    const findCommentUpdate = await this.findCommentById(commentId);
    if (+findCommentUpdate.user.id === +userId) {
      try {
        await this.repository.update(commentId, { text: updateInfo });
        resultUpdate = true;
      } catch (error) {
        resultUpdate = undefined;
      }
    }
    return resultUpdate;
  }
}
