import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/users.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: string, nickname: string) {
    try {
      this.mailerService.sendMail({
        to: email,
        from: '"Support Team" <support@example.com>', // override default from
        subject: 'Welcome to Nice App! Confirm your Email',
        template: './transactional', // either change to ./transactional or rename transactional.html to confirmation.html
        context: {
          name: nickname,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
