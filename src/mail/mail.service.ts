import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    try {
      this.mailerService.sendMail({
        to: user.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Welcome to Nice App! Confirm your Email',
        template: './transactional', // either change to ./transactional or rename transactional.html to confirmation.html
        context: {
          name: user.nickname,
          // url,
        },
      });
    } catch (error) {
      console.log(error);
    }
    // const url = `http://localhost:8000/auth/confirm?token=${token}`;
  }
}
