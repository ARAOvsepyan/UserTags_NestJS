import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            error: 'Необходима авторизация',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const user = this.jwtService.verify(token);
      const userId = user.userId;
      if (!userId) {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            error: 'Необходима авторизация',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      req.userId = userId;
      return true;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Необходима авторизация',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
