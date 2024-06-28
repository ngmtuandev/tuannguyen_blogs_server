import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import {
  NotificationRepository,
  UserRepository,
} from 'src/database/repository';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepository, UserRepository],
  exports: [NotificationRepository],
  imports: [],
})
export class NotificationModule {}
