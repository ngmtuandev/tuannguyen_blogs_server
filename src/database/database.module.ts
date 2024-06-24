import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CommentEntity,
  EmotionEntity,
  PostEmotionEntity,
  PostEntity,
  PostTranslationEntity,
  SessionCodeEntity,
  TagEntity,
  UserEntity,
} from './entity';

// TODO: FIX .ENV
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Manhtuan123***',
      database: 'blog',
      entities: [
        UserEntity,
        TagEntity,
        PostEntity,
        PostTranslationEntity,
        EmotionEntity,
        PostEmotionEntity,
        CommentEntity,
        SessionCodeEntity,
      ],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
