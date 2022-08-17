import { Body, Controller, Delete, Get, Headers, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';
import UsersService from './users.service';

@ApiTags('Информация о пользователях')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersServise: UsersService) {}

  @ApiHeader({
    name: 'Authorization',
    description: 'Berare JWT',
    required: true,
  })
  @ApiOperation({
    summary: 'Get user info',
  })
  @ApiResponse({ status: 200, type: User })
  @Get()
  async getUser(@Headers() headers) {
    return this.usersServise.getUserInfo(headers);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Berare JWT',
    required: true,
  })
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 204,
    description: 'Updated info',
  })
  @Put()
  async updateUser(@Headers() headers, @Body() info: UpdateUserDto) {
    return this.usersServise.updateUser(info, headers);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Berare JWT',
    required: true,
  })
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 204,
    description: 'Deleted info',
  })
  @Delete()
  async deleteUser(@Headers() headers) {
    return this.usersServise.deleteUser(headers);
  }
}
