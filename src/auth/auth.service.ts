import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/users.model';

import { LogInDto } from './dto/logIn.dto';
import { SingInDto } from './dto/singIn.dto';
import { JwtDto } from './dto/jwt.dto';

import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async singInUser(dto: SingInDto) {
    const condidate = await this.userRepository.findAll({
      where: Sequelize.or({ email: dto.email }, { nickname: dto.nickname }),
    });
    if (condidate === []) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Некорректный email или nickname',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hash_password = await bcrypt.hash(dto.password, 5);
    // const user = await this.userRepository.create({
    //   email: dto.email,
    //   password: hash_password,
    //   nickname: dto.nickname,
    // });

    const payload = { uid: '1231j31l2;312;1', email: dto.email };

    const token = this.jwtService.sign(payload);

    await this.mailService.sendUserConfirmation(dto.email, dto.nickname);

    return { token: token };
  }

  async logInUsers(dto: LogInDto): Promise<JwtDto> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'Данные не верны' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const comparePassword = bcrypt.compare(dto.password, user.password);
    if (!comparePassword) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'Данные не верны' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = { uid: user.uid, email: user.email };
    return { token: this.jwtService.sign(payload) };
  }
}
