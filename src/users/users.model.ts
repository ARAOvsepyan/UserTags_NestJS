import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Tag } from '../tags/tags.model';
import { UserTags } from '../user_tags/user_tags.model';

interface UserCretionAttributs {
  email: string;
  password: string;
  nickname: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCretionAttributs> {
  @ApiProperty({
    example: '5eff1450-19df-11ed-ae08-3fb844e47ea4',
    description: 'Уникальный идентификатор',
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  })
  uid: string;

  @ApiProperty({
    example: 'example@example.com',
    description: 'Почтовый адрес',
  })
  @Column({ type: DataType.STRING(100), unique: true, allowNull: false })
  email: string;

  @ApiProperty({
    example: 'password1234',
    description: 'Пароль пользователя',
  })
  @Column({ type: DataType.STRING(100), allowNull: false })
  password: string;

  @ApiProperty({
    example: 'ExampleNick',
    description: 'Уникальный никнейм',
  })
  @Column({ type: DataType.STRING(30), unique: true, allowNull: false })
  nickname: string;

  @HasMany(() => Tag)
  tags: Tag[];

  @BelongsToMany(() => Tag, () => UserTags)
  tag: Tag[];
}
