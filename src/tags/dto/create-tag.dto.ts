import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({
    example: 'ExampleTagName',
    description: 'Название тега',
  })
  readonly name: string;

  @ApiProperty({
    example: '1',
    description: 'Ключ сортировки',
  })
  readonly sortOrder: number;

  @ApiProperty({
    example: '5eff1450-19df-11ed-ae08-3fb844e47ea4',
    description: 'Идентификатор пользователя',
  })
  readonly creatorUid: string;
  length: number;
}
