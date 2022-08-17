import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'NewExample@example.com',
    description: 'Почтовый адрес',
  })
  readonly email: string;
  @ApiProperty({
    example: 'NewPassword1234',
    description: 'Пароль пользователя',
  })
  readonly password: string;
  @ApiProperty({
    example: 'NewExampleNick',
    description: 'Уникальный никнейм',
  })
  readonly nickname: string;
}
