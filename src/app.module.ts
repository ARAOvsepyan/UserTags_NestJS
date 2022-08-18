import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { UserTagsModule } from './user_tags/user_tags.module';
import { TagsModule } from './tags/tags.module';
import { User } from './users/user.model';
import { AuthModule } from './auth/auth.module';
import { Tag } from './tags/tags.model';
import { UserTags } from './user_tags/user_tags.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGERS_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Tag, UserTags],
      autoLoadModels: true,
    }),
    UsersModule,
    UserTagsModule,
    TagsModule,
    AuthModule,
  ],
})
export class AppModule {}
