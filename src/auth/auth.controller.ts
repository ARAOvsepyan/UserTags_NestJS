import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ValidationPipe } from '../pipes/validation.pipe';

import { AuthService } from './auth.service';

import { JwtDto } from './dto/jwt.dto';
import { LogInDto } from './dto/logIn.dto';
import { SingInDto } from './dto/singIn.dto';

@ApiTags('Авторизация и Аутентификация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'SingIn' })
  @ApiResponse({ status: 201, type: JwtDto, description: 'JWT' })
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  @Post('/singin')
  singin(@Body() singInDto: SingInDto) {
    return this.authService.singInUser(singInDto);
  }

  @ApiOperation({ summary: 'LogIn' })
  @ApiResponse({ status: 200, type: JwtDto, description: 'JWT' })
  @Post('/login')
  login(@Body() logInDto: LogInDto): Promise<JwtDto> {
    return this.authService.logInUsers(logInDto);
  }

  @ApiHeader({ name: 'Authorization', description: 'JWT' })
  @ApiOperation({ summary: 'LogOut' })
  @ApiResponse({ status: 200 })
  @Post('/logout')
  logout(@Res() res): Promise<{ success: string }> {
    return res.clearCookie('token').send({ success: 'logout' });
  }
}
