import { Injectable } from '@nestjs/common';
import { EmotionRepository } from 'src/database/repository';
import { CreateEmotionDto, EmotionDto } from 'src/infrastructure/dto';
import { XFunction } from 'src/infrastructure/xhelper';

@Injectable()
export class EmotionService {
  constructor(private readonly emotionRepository: EmotionRepository) {}

  async create(emotionInfo: CreateEmotionDto) {
    const result = await this.emotionRepository.create(emotionInfo);
    return result;
  }

  async findById(id: number) {
    const result = await this.emotionRepository.findById(id);
    const emotionConvertTo = XFunction.convertEntityTo(result, EmotionDto);
    return emotionConvertTo;
  }

  async findAll() {
    const resultAllEmotion = await this.emotionRepository.findAll();
    const emotionAllConvertTo = XFunction.convertEntityTo(
      resultAllEmotion,
      EmotionDto,
    );
    return emotionAllConvertTo;
  }

  async deleteById(id: number) {
    const result = await this.emotionRepository.deleteById(id);
    return result;
  }
}
