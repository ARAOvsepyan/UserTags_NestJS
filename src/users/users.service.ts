import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';

@Injectable()
export default class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private jwtService: JwtService,
  ) {}

  async getUserInfo(header: { authorization: string }) {
    const token = header.authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token);

    const user = await User.findByPk(decoded.uid);
    return user;
  }

  async updateUser(info: UpdateUserDto, header: { authorization: string }) {
    const token = header.authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token);

    const new_user_data = new this.userRepository();
    if (info.email) {
      const user = await this.userRepository.findAll({
        where: { email: info.email },
      });
      if (user.length > 0) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Данный email уже занят',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      new_user_data.email = info.email;
    }

    if (info.password) {
      const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

      if (info.password.match(password)) {
        new_user_data.password = await bcrypt.hash(info.password, 5);
      } else {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Некорректный пароль',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (info.nickname) {
      const user = await this.userRepository.findAll({
        where: { nickname: info.nickname },
      });
      if (user.length > 0) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Данный nickname уже занят',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      new_user_data.nickname = info.nickname;
    }

    const update_user = await User.update(
      {
        email: new_user_data.email,
        password: new_user_data.password,
        nickname: new_user_data.nickname,
      },
      {
        where: { uid: decoded.uid },
      },
    );

    return update_user;
  }

  async deleteUser(header: { authorization: string }) {
    const token = header.authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token);

    const delete_user = await this.userRepository.destroy({
      where: { uid: decoded.uid },
    });

    return delete_user;
  }
}
