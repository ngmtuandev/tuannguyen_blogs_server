import { Module } from '@nestjs/common';
import { EmotionService } from './emotion.service';
import { EmotionController } from './emotion.controller';
import { EmotionRepository } from 'src/database/repository';

@Module({
  providers: [EmotionService, EmotionRepository],
  imports: [],
  exports: [],
  controllers: [EmotionController],
})
export class EmotionModule {}
