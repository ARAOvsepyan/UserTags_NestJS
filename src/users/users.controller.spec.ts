import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('Users Controller', () => {
  let controller: UsersController;

  const mockUsersService = {};
  const mockAuthGuard = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
