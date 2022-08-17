import {
  HttpException,
  HttpStatus,
  Injectable,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.model';
import { CreateTagDto } from './dto/create-tag.dto';
import { SearchTagDto } from './dto/search-tag.dto';
import { Tag } from './tags.model';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag) private readonly tagRepository: typeof Tag,
    @InjectModel(User) private readonly userRepository: typeof User,
    private jwtService: JwtService,
  ) {}

  async getAllTags(search: SearchTagDto): Promise<Tag[]> {
    return this.tagRepository.findAll();
  }

  async getTagById(id: number): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt', 'creatorUId', 'id'] },
      include: [
        {
          model: User,
          attributes: ['email', 'nickname'],
        },
      ],
    });
    return tag;
  }

  async createTag(
    tag: CreateTagDto,
    header: { authorization: string },
  ): Promise<Tag> {
    const token = header.authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token);
    try {
      const tags = await this.tagRepository.create({
        creatorUId: decoded.uid,
        ...tag,
      });

      return tags;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Имя тега уже занято',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateTagById(id: number, tag: CreateTagDto) {
    return this.tagRepository.update(tag, { where: { id } });
  }

  async deleteTagById(id: number) {
    return this.tagRepository.destroy({ where: { id } });
  }
}
