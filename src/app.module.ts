import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule, PostModule, UserModule } from './domain';
import { DatabaseModule } from './database';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard, RolesGuard } from './domain/guard';
import { APP_GUARD } from '@nestjs/core';
import { MailerModule } from '@nestjs-modules/mailer';
import { TagModule } from './domain/tag/tag.module';
import { LoggerModule } from './common/logger';

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
  ],
  controllers: [AppController],
  providers: [
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
