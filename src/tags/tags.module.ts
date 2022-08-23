import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { jwtConstants } from '../auth/constants';
import { User } from '../users/users.model';
import { UserTags } from '../user_tags/user_tags.model';
import { TagsController } from './tags.controller';
import { Tag } from './tags.model';
import { TagsService } from './tags.service';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [
    AuthModule,
    SequelizeModule.forFeature([User, Tag, UserTags]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class TagsModule {}
