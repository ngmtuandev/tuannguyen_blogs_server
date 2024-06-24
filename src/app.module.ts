import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AuthModule,
  CommentModule,
  EmotionModule,
  PostEmotionModule,
  PostModule,
  UserModule,
} from './domain';
import { DatabaseModule } from './database';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard, RolesGuard } from './domain/guard';
import { APP_GUARD } from '@nestjs/core';
import { TagModule } from './domain/tag/tag.module';
import { LoggerModule } from './common/logger';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduledTasksService } from './domain/user/schedule.task.service';
import { SessionCodeRepository } from './database/repository';

// TODO: FIX .ENV
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    LoggerModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    TagModule,
    PostModule,
    EmotionModule,
    PostEmotionModule,
    CommentModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [
    SessionCodeRepository,
    ScheduledTasksService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
