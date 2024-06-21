import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: 'Nguyen Manh Tuan',
    description: 'Name of client',
    nullable: false,
  })
  @IsString()
  @IsOptional()
  userName?: string;

  @ApiProperty({
    example: 'Province, where you from, social media',
    description: 'Additional info client as province, hobby.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  avatar: string;
}
