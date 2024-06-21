import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { SendMailerService } from './send-mailer.service';

// TODO: FIX .ENV
@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'tuan2k2nhat@gmail.com',
          pass: 'orxm liou yrjq ixxt',
        },
      },
    }),
  ],
  providers: [SendMailerService],
  exports: [SendMailerService],
})
export class SendMailerModule {}
