import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddTagDto } from './dto/add-tags.dto';
import { UserTags } from './user_tags.model';
import { UserTagsService } from './user_tags.service';

@ApiBearerAuth()
@ApiTags('Теги пользователя')
@UseGuards(JwtAuthGuard)
@Controller('user/tags')
export class UserTagsController {
  constructor(private readonly userTagsSevice: UserTagsService) {}

  @ApiHeader({
    name: 'Authorization',
    description: 'Berare JWT',
    required: true,
  })
  @ApiOperation({ summary: 'Add tags' })
  @ApiResponse({ status: 200, type: UserTags, isArray: true })
  @Post()
  async addTag(
    @Headers() headers: { authorization: string },
    @Body() tags: AddTagDto,
  ) {
    return this.userTagsSevice.addTag(tags, headers);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Berare JWT',
    required: true,
  })
  @ApiOperation({ summary: 'Delete tag' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  async deleteTag(
    @Headers() headers: { authorization: string },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userTagsSevice.deleteTag(headers, id);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Berare JWT',
    required: true,
  })
  @ApiOperation({ summary: 'Get all tags' })
  @ApiResponse({
    status: 200,
    type: UserTags,
    isArray: true,
    description: 'All tags',
  })
  @Get('/my')
  async getTags(@Headers() headers: { authorization: string }) {
    return this.userTagsSevice.getTags(headers);
  }

}
