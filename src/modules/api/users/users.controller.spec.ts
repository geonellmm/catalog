import { Test } from '@nestjs/testing';
import { UsersController } from '@/modules/api/users/users.controller';
import { UsersService } from '@/modules/api/users/users.service';
import { AuthService } from '@/modules/api/auth/auth.service';
import { CreateUserDTO } from '@/modules/api/users/dto/create-user.dto';
import { LogInDTO, LogInResponseDTO } from '@/modules/api/users/dto/signin-user.dto';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@/modules/common/prisma/prisma.module';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;
  let authService: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, AuthService],
      imports: [
        JwtModule.register({ secret: 'test-secret' }),
        PrismaModule,
      ],
    }).compile();

    usersService = module.get(UsersService);
    authService = module.get(AuthService);
    controller = module.get(UsersController);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const createUserDTO: CreateUserDTO = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        type: 'Admin',
      };

      const result: LogInResponseDTO = {
        accessToken: 'mockAccessToken',
        user: {
          id: 1,
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          type: 'Admin',
        },
      };

      jest.spyOn(usersService, 'create').mockResolvedValue(result);


      expect(await controller.register(createUserDTO)).toBe(result);
      expect(usersService.create).toHaveBeenCalledWith(createUserDTO);
    });
  });

  describe('signIn', () => {
    it('should sign in a user', async () => {
      const signInDTO: LogInDTO = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result: LogInResponseDTO = {
        accessToken: 'mockAccessToken',
        user: {
          id: 1,
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          type: 'Admin',
        },
      };

      jest.spyOn(authService, 'signIn').mockResolvedValue(result);

      expect(await controller.signIn(signInDTO)).toBe(result);
      expect(authService.signIn).toHaveBeenCalledWith(signInDTO);
    });
  });
});
