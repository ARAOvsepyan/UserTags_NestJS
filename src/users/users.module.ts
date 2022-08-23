import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { jwtConstants } from '../auth/constants';
import { Tag } from '../tags/tags.model';
import { UserTags } from '../user_tags/user_tags.model';
import { User } from './users.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([User, UserTags, Tag]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  exports: [UsersService],
})
export class UsersModule {}
