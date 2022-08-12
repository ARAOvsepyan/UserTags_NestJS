import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/users/user.model';
import { LogInDto } from './dto/logIn.dto';
import { SingInDto } from './dto/singIn.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async singInUser(dto: SingInDto) {
    try {
      const condidate = await this.userRepository.findAll({
        where: Sequelize.or({ email: dto.email }, { nickname: dto.nickname }),
      });
      if (condidate) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Некорректный email или nickname',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const hash_password = await bcrypt.hash(dto.password, 5);
      const user = await this.userRepository.create({
        email: dto.email,
        password: hash_password,
        nickname: dto.nickname,
      });
      return user;
    } catch (e) {
      throw new HttpException(
        { status: HttpStatus.INTERNAL_SERVER_ERROR, error: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async logInUsers(dto: LogInDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'Данные не верны' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const comparePassword = bcrypt.compare(dto.password, user.password)
    if (!comparePassword) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'Данные не верны' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  async logOut() {
    return 'LogOut';
  }
}
