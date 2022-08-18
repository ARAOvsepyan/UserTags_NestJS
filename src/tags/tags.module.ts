import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { jwtConstants } from 'src/auth/constants';
import { User } from 'src/users/user.model';
import { UserTags } from 'src/user_tags/user_tags.model';
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
