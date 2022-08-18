import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Tag } from 'src/tags/tags.model';
import { User } from 'src/users/user.model';

interface UserTagsCretionAttributs {
  userUId: string;
  tagId: number;
}

@Table({ tableName: 'user_tags', createdAt: false, updatedAt: false })
export class UserTags extends Model<UserTags, UserTagsCretionAttributs> {
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: '5eff1450-19df-11ed-ae08-3fb844e47ea4',
    description: 'Идентификатор пользователя',
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userUId: string;

  @ApiProperty({
    example: '1',
    description: 'Идентификатор тега',
  })
  @ForeignKey(() => Tag)
  @Column({ type: DataType.INTEGER })
  tagId: number;
}
