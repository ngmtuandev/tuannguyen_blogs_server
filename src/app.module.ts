import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './domain';
import { DatabaseModule } from './database';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, UserModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
