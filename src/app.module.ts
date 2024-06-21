import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule, UserModule } from './domain';
import { DatabaseModule } from './database';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard, RolesGuard } from './domain/guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UserModule, AuthModule],
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
