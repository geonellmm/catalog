import { IsEmail, IsString, MinLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from '@/modules/api/users/dto/create-user.dto';

export class LogInDTO {
  @IsEmail()
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ example: 'StrongPassword123' })
  password: string;
}

export class LogInResponseDTO {
  @ApiProperty({ example: 'your-jwt-token' })
  accessToken: string;

  @ApiProperty({ type: UserDTO })
  user: UserDTO;
}