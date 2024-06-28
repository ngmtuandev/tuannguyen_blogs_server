import { EntityManager, EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { NotificationEntity, UserEntity } from '../entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationRepository extends GenericRepository<NotificationEntity> {
  protected repository: Repository<NotificationEntity>;

  getEntityType(): EntityTarget<NotificationEntity> {
    return NotificationEntity;
  }

  async create(transactionManager: EntityManager, notificationInfo: any) {
    try {
      const newNotification = transactionManager.create(
        NotificationEntity,
        notificationInfo,
      );
      return await transactionManager.save(NotificationEntity, newNotification);
    } catch (error) {
      throw error;
    }
  }

  async findAll(userId: number) {
    const result = await this.repository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user', 'comment'],
    });
    return result;
  }

  async findOneById(notificationId: number) {
    const result = await this.repository.find({
      where: { id: notificationId },
      relations: ['user', 'comment'],
    });
    return result;
  }
}
