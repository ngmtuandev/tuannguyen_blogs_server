import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EMOTION_ICON } from 'src/infrastructure/enum';

export class CreateEmotionDto {
  @Expose({ name: 'emotion_icon' })
  emotionIcon: EMOTION_ICON;

  @IsNotEmpty()
  @Expose({ name: 'text' })
  text: string;
}
