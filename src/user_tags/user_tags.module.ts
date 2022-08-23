import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { jwtConstants } from '../auth/constants';
import { Tag } from '../tags/tags.model';
import { User } from '../users/users.model';
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
