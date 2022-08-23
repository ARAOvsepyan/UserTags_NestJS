import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersModule } from './users/users.module';
import { UserTagsModule } from './user_tags/user_tags.module';
import { TagsModule } from './tags/tags.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseConnectionService } from './database-connection.service';
// import { MailModule } from './mail/mail.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    UsersModule,
    UserTagsModule,
    TagsModule,
    AuthModule,
    // MailModule,
  ],
})
export class AppModule {}
