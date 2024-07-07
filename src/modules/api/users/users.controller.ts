import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UsersService } from '@/modules/api/users/users.service';
import { AuthService } from '@/modules/api/auth/auth.service';
import { CreateUserDTO } from '@/modules/api/users/dto/create-user.dto';
import { LogInDTO, LogInResponseDTO } from '@/modules/api/users/dto/signin-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully registered.',
    type: LogInResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Email already exists'
  })
  @ApiBody({ type: CreateUserDTO })
  async register(@Body() createUserDTO: CreateUserDTO){
    return await this.userService.create(createUserDTO);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user logged in successfully.',
    type: LogInResponseDTO,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBody({ type: LogInDTO })
  async signIn(@Body() signInUserDTO: LogInDTO) {
      return await this.authService.signIn(signInUserDTO);
  }
}
