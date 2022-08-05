import { Module } from '@nestjs/common';
import { UserTagsController } from './user_tags.controller';
import { UserTagsService } from './user_tags.service';

@Module({
  controllers: [UserTagsController],
  providers: [UserTagsService],
})
export class UserTagsModule {}
