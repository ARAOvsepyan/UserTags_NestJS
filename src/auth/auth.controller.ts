import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/user.model';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/logIn.dto';
import { SingInDto } from './dto/singIn.dto';

@ApiTags('Авторизация и Аутентификация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'SingIn' })
  @ApiResponse({ status: 200, type: User })
  @Post('/singin')
  singin(@Body() singInDto: SingInDto) {
    return this.authService.singInUser(singInDto);
  }

  @ApiOperation({ summary: 'LogIn' })
  @ApiResponse({ status: 200, type: [User] })
  @Post('/login')
  login(@Body() logInDto: LogInDto) {
    return this.authService.logInUsers(logInDto);
  }

  @ApiOperation({ summary: 'LogOut' })
  @ApiResponse({ status: 200 })
  @Post('/logot')
  logout() {
    return this.authService.logOut();
  }
}
