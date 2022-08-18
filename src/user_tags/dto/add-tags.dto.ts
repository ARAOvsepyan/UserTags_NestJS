import { ApiProperty } from '@nestjs/swagger';

export class AddTagDto {
  @ApiProperty({
    example: '[1, 2, 3]',
    description: 'Идентификаторы тегов',
  })
  readonly tags: Array<number>;
}
