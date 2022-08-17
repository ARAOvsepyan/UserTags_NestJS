import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Headers,
  Put,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTagDto } from './dto/create-tag.dto';
import { SearchTagDto } from './dto/search-tag.dto';
import { Tag } from './tags.model';
import { TagsService } from './tags.service';

@ApiTags('Теги')
@ApiBearerAuth()
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiHeader({
    name: 'Authorization',
    description: 'Berare JWT',
    required: true,
  })
  @ApiOperation({ summary: 'Create Tag' })
  @ApiResponse({ status: 201, type: Tag, description: 'Example Tag' })
  @Post()
  async createTag(
    @Headers() headers: { authorization: string },
    @Body() tag: CreateTagDto,
  ) {
    return this.tagsService.createTag(tag, headers);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Berare JWT',
    required: true,
  })
  @ApiOperation({ summary: 'Get all Tags' })
  @ApiResponse({
    status: 200,
    type: Tag,
    isArray: true,
    description: 'All Tags',
  })
  @Get()
  async getAllTags(@Query('search') search: SearchTagDto) {
    return this.tagsService.getAllTags(search);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Berare JWT',
    required: true,
  })
  @ApiOperation({ summary: 'Get Tag by id' })
  @ApiResponse({ status: 200, type: Tag, description: 'Tag' })
  @Get(':id')
  async getTagById(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.getTagById(id);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Berare JWT',
    required: true,
  })
  @ApiOperation({ summary: 'Delete Tag by id' })
  @ApiResponse({ status: 204, description: 'Deleted Tag' })
  @Delete(':id')
  async deleteTagById(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.deleteTagById(id);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Berare JWT',
    required: true,
  })
  @ApiOperation({ summary: 'Update Tag by id' })
  @ApiResponse({ status: 204, description: 'Updated Tag' })
  @Put(':id')
  async updateTagById(
    @Query('id', ParseIntPipe) id: number,
    @Body() tag: CreateTagDto,
  ) {
    return this.tagsService.updateTagById(id, tag);
  }
}
