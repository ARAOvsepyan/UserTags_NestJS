import { Injectable } from '@nestjs/common';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { Tag } from './tags/tags.model';
import { User } from './users/users.model';
import { UserTags } from './user_tags/user_tags.model';

@Injectable()
export class DatabaseConnectionService implements SequelizeOptionsFactory {
  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      name: 'default',
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, UserTags, Tag],
      synchronize: true,
      logging: true,
    };
  }
}
