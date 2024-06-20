import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Manhtuan123***',
      database: 'blog',
      entities: [UserEntity],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
