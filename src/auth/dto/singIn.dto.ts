import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SingInDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'Почтовый адрес',
  })
  @IsString({ message: 'Почтовый адрес должен быть строкой' })
  @IsEmail({}, { message: 'Некорректный адрес электронной почты' })
  readonly email: string;
  @ApiProperty({
    example: 'password1234',
    description: 'Пароль пользователя',
  })
  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  @Length(8, 20, { message: 'Длина пароля должна быть от 8 до 20 символов' })
  readonly password: string;
  @ApiProperty({
    example: 'ExampleNick',
    description: 'Уникальный никнейм',
  })
  @IsNotEmpty({ message: 'Никнейм не может быть пустым' })
  @IsString({ message: 'Никнейм должен быть строкой' })
  readonly nickname: string;
}
