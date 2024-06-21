import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { XFunction } from 'src/infrastructure/xhelper';

@Injectable()
export class SendMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMailer(email: string) {
    const codeConfirm = XFunction.generateTokenRandom();

    try {
      await this.mailerService.sendMail({
        to: email,
        from: 'No Reply <tuannguyen_blog@iuh.com>',
        subject: 'Welcome to Nice App! Confirm your Email',
        text: 'welcome',
        html: `
          <p>Hello, ${email}</p>
          <p>A confirmation email has been sent to your email address.</p>
          <p>Please check your email to confirm your account.</p>
          <p>Code : ${codeConfirm}</p>
          <p>Thank you!</p>
        `,
      });
      return codeConfirm;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
