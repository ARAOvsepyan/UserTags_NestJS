import { ApiProperty } from '@nestjs/swagger';

export class SearchTagDto {
  @ApiProperty({
    example: 'PageNumber: 1',
    description: 'Номер страницы',
  })
  readonly page: string;

  @ApiProperty({
    example: 'PageSize: 10',
    description: 'Размер страницы',
  })
  readonly pageSize: number;

  @ApiProperty({
    example: 'SortByOrder: true or false',
    description: 'Присутсвует или отсутствует сортировка по ключу',
  })
  readonly sortByOrder: boolean;

  @ApiProperty({
    example: 'SortByName: true or false',
    description: 'Присутсвует или отсутствует сортировка по названию',
  })
  readonly sortByName: boolean;
}
