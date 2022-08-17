import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Model,
  Table,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';

interface TagCretionAttributs {
  name: string;
  sortOrder: number;
  creatorUId: string;
}

@Table({ tableName: 'tags' })
export class Tag extends Model<Tag, TagCretionAttributs> {
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
    example: 'ExampleTagName',
    description: 'Название тега',
  })
  @Column({ type: DataType.STRING(40), unique: true, allowNull: false })
  name: string;

  @ApiProperty({
    example: '1',
    description: 'Ключ сортировки',
    default: '0',
  })
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  sortOrder: number;

  @ApiProperty({
    example: '5eff1450-19df-11ed-ae08-3fb844e47ea4',
    description: 'Идентификатор пользователя',
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  creatorUId: string;

  @BelongsTo(() => User)
  creator: User;
}
