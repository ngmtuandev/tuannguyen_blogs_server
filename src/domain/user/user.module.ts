import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from 'src/database/entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionCodeRepository, UserRepository } from 'src/database/repository';
import { SendMailerService } from '../mailer';
import { SendMailerModule } from '../mailer/send-mailer.module';
import { ScheduledTasksService } from './schedule.task.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), SendMailerModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    SendMailerService,
    SessionCodeRepository,
    ScheduledTasksService,
  ],
  exports: [ScheduledTasksService]
})
export class UserModule {}
