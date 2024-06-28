import { Injectable } from '@nestjs/common';
import {
  NotificationRepository,
  UserRepository,
} from 'src/database/repository';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async findAll(req: any) {
    const result = await this.notificationRepository.findAll(req.userInfo.sub);
    return result;
  }

  async findOneOfNotification(notificationId: number) {
    const result =
      await this.notificationRepository.findOneById(notificationId);
    return result;
  }
}
