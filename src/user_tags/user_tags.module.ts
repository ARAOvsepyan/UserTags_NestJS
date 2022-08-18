import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { jwtConstants } from 'src/auth/constants';
import { Tag } from 'src/tags/tags.model';
import { User } from 'src/users/user.model';
import { UserTagsController } from './user_tags.controller';
import { UserTags } from './user_tags.model';
import { UserTagsService } from './user_tags.service';

@Module({
  controllers: [UserTagsController],
  providers: [UserTagsService],
  imports: [
    AuthModule,
    SequelizeModule.forFeature([UserTags, User, Tag]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class UserTagsModule {}
