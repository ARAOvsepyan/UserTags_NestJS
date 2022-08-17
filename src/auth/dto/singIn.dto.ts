import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsUppercase,
  Length,
  IsLowercase,
} from 'class-validator';

export class SingInDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'Почтовый адрес',
  })
  @IsEmail()
  readonly email: string;
  @ApiProperty({
    example: 'password1234',
    description: 'Пароль пользователя',
  })
  @IsNotEmpty()
  @Length(8, 20)
  readonly password: string;
  @ApiProperty({
    example: 'ExampleNick',
    description: 'Уникальный никнейм',
  })
  @IsNotEmpty()
  readonly nickname: string;
}
