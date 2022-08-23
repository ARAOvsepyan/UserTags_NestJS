import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.model';
import { CreateTagDto } from './dto/create-tag.dto';
import { SearchTagDto } from './dto/search-tag.dto';
import { Tag } from './tags.model';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag) private readonly tagRepository: typeof Tag,
    @InjectModel(User) private readonly userRepository: typeof User,
    private jwtService: JwtService,
  ) {}

  async getAllTags(search: SearchTagDto) {
    const page = search.page || 1;
    const pageSize = search.pageSize || 10;
    const offset = page * pageSize - pageSize;

    if (search.sortByOrder != undefined) {
      const tags = await this.tagRepository.findAndCountAll({
        attributes: ['name', 'sortOrder'],
        include: [
          {
            model: this.userRepository,
            attributes: ['uid', 'nickname'],
          },
        ],
        order: ['sortOrder'],
        limit: pageSize,
        offset: offset,
      });
      return {
        data: tags.rows,
        meta: { page, pageSize, quantity: tags.count },
      };
    }

    if (search.sortByName != undefined) {
      const tags = await this.tagRepository.findAndCountAll({
        attributes: ['name', 'sortOrder'],
        include: [
          {
            model: this.userRepository,
            attributes: ['nickname', 'uid'],
          },
        ],
        order: ['name'],
        limit: pageSize,
        offset: offset,
      });

      return {
        data: tags.rows,
        meta: { page, pageSize, quantity: tags.count },
      };
    }

    if (search.sortByName && search.sortByOrder) {
      const tags = await Tag.findAndCountAll({
        attributes: ['name', 'sortOrder'],
        include: [
          {
            model: this.userRepository,
            attributes: ['nickname', 'uid'],
          },
        ],
        order: ['name', 'sortOrder'],
        limit: pageSize,
        offset: offset,
      });

      return {
        data: tags.rows,
        meta: { page, pageSize, quantity: tags.count },
      };
    }

    const tags = await Tag.findAndCountAll({
      attributes: ['name', 'sortOrder'],
      include: [
        {
          model: this.userRepository,
          attributes: ['nickname', 'uid'],
        },
      ],
      limit: pageSize,
      offset: offset,
    });
    return { data: tags.rows, meta: { page, pageSize, quantity: tags.count } };
  }

  async getTagById(id: number): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt', 'creatorUId', 'id'] },
      include: [
        {
          model: this.userRepository,
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

  async updateTagById(
    id: number,
    header: { authorization: string },
    tag: UpdateTagDto,
  ) {
    const token = header.authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token);

    const conditate_tag = await this.tagRepository.findOne({ where: { id } });
    if (conditate_tag.creatorUId === decoded.uid) {
      await Tag.update({ ...tag }, { where: { id } });

      const updated_tag = await this.tagRepository.findOne({
        attributes: ['name', 'sortOrder'],
        include: [
          {
            model: this.userRepository,
            attributes: ['uid', 'nickname'],
          },
        ],
        where: { id: id },
      });

      return updated_tag;
    } else {
      return new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Нет прав на редактирование этого тега',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async deleteTagById(id: number, header: { authorization: string }) {
    try {
      const token = header.authorization.split(' ')[1];
      const decoded = this.jwtService.verify(token);

      const tag = await this.tagRepository.findOne({ where: { id } });

      if (tag.creatorUId === decoded.uid) {
        await this.tagRepository.destroy({ where: { id } });

        return;
      } else {
        return new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            error: 'Нет прав на удаление этого тега',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      return new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Тег не найден',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
