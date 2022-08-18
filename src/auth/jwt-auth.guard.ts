import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | boolean | Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        throw new HttpException('Нет авторизации', HttpStatus.UNAUTHORIZED);
      }
      const token = authHeader.split(' ')[1];
      const decoded = this.jwtService.verify(token);
      const userId = decoded.userId;
      if (!userId) {
        throw new HttpException('Не корректный токен', HttpStatus.UNAUTHORIZED);
      }
      request.userId = userId;
      return true;
    } catch (error) {
      throw new HttpException('Нет авторизации', HttpStatus.UNAUTHORIZED);
    }
  }
}
