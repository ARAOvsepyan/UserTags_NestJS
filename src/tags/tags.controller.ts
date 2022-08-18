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
  HttpCode,
  HttpStatus,
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
import { CreateTagDto } from './dto/create-tag.dto';
import { SearchTagDto } from './dto/search-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './tags.model';
import { TagsService } from './tags.service';

@ApiTags('Теги')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Berare JWT',
    required: true,
  })
  @ApiOperation({ summary: 'Create Tag' })
  @ApiResponse({ status: 201, type: Tag, description: 'Example Tag' })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createTag(
    @Headers() headers: { authorization: string },
    @Body() tag: CreateTagDto,
  ) {
    return this.tagsService.createTag(tag, headers);
  }

  @ApiOperation({ summary: 'Get all Tags' })
  @ApiResponse({
    status: 200,
    type: Tag,
    isArray: true,
    description: 'All Tags',
  })
  @Get()
  async getAllTags(@Query() search: SearchTagDto) {
    return this.tagsService.getAllTags(search);
  }

  @ApiOperation({ summary: 'Get Tag by id' })
  @ApiResponse({ status: 200, type: Tag, description: 'Tag' })
  @Get(':id')
  async getTagById(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.getTagById(id);
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Berare JWT',
    required: true,
  })
  @ApiOperation({ summary: 'Delete Tag by id' })
  @ApiResponse({ status: 200, description: 'Deleted Tag' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTagById(
    @Param('id', ParseIntPipe) id: number,
    @Headers() headers,
  ) {
    return this.tagsService.deleteTagById(id, headers);
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Berare JWT',
    required: true,
  })
  @ApiOperation({ summary: 'Update Tag by id' })
  @ApiResponse({ status: 200, description: 'Updated Tag' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateTagById(
    @Param('id', ParseIntPipe) id: number,
    @Body() tag: UpdateTagDto,
    @Headers() headers,
  ) {
    return this.tagsService.updateTagById(id, headers, tag);
  }
}
