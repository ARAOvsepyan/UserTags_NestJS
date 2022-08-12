import { ApiProperty } from '@nestjs/swagger';

export class LogInDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'Почтовый адрес',
  })
  readonly email: string;
  @ApiProperty({
    example: 'password1234',
    description: 'Пароль пользователя',
  })
  readonly password: string;
}
