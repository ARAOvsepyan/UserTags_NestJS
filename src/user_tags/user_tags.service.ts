import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Tag } from 'src/tags/tags.model';
import { AddTagDto } from './dto/add-tags.dto';
import { UserTags } from './user_tags.model';

@Injectable()
export class UserTagsService {
  constructor(
    @InjectModel(UserTags) private readonly UserTagsRepositpry: typeof UserTags,
    @InjectModel(Tag) private readonly tagRepository: typeof Tag,
    private jwtService: JwtService,
  ) {}

  async addTag({ tags }: AddTagDto, header: { authorization: string }) {
    const token = header.authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token);

    for (let i = 0; i < tags.length; i++) {
      try {
        await this.UserTagsRepositpry.create({
          userUId: decoded.uid,
          tagId: tags[i],
        });
      } catch {
        return new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Такого тега не существует',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return { succes: 'Теги успешно добавлены' };
  }

  async deleteTag(header: { authorization: string }, id: number) {
    const token = header.authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token);

    await this.UserTagsRepositpry.destroy({
      where: {
        [Op.and]: [{ tagId: id }, { userUId: decoded.uid }],
      },
    });

    return { success: 'Тег успешно удален' };
  }

  async getTags(header: { authorization: string }) {
    const token = header.authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token);

    const tags = await this.UserTagsRepositpry.findAll({
      where: {
        userUId: decoded.uid,
      },
    });

    const user_tag = await this.tagRepository.findAll({
      where: {
        id: tags.map((tag) => tag.tagId),
      },
      attributes: ['id', 'name', 'sortOrder'],
    });

    return user_tag;
  }
}
