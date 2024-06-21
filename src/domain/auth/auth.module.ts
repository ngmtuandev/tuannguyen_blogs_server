import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/database/repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
  imports: [
    JwtModule.register({
      global: true,
      secret: '111', // TODO: FIX .ENV
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
