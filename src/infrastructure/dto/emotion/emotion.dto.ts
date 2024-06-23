import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EMOTION_ICON } from 'src/infrastructure/enum';

export class EmotionDto {
  @Expose({ name: 'id' })
  id: number;

  @IsNotEmpty()
  @Expose({ name: 'emotionIcon' })
  emotionIcon: EMOTION_ICON;

  @IsNotEmpty()
  @Expose({ name: 'text' })
  text: string;
}
