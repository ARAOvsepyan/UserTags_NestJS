import { Controller } from '@nestjs/common';
import { UserTagsService } from './user_tags.service';

@Controller('user-tags')
export class UserTagsController {
  constructor(private readonly userTagsSevice: UserTagsService) {}
}
