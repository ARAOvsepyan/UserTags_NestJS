import { ApiProperty } from '@nestjs/swagger';

export class UpdateTagDto {
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
}
