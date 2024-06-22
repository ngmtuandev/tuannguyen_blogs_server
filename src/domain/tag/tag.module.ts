import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TagRepository } from 'src/database/repository';

@Module({
  controllers: [TagController],
  providers: [TagService, TagRepository],
  imports: [],
  exports: [],
})
export class TagModule {}
