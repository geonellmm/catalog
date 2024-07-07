import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from '@nestjs/class-validator';
import { UserType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: 'Admin' })
  type: UserType;
}
export class CreateUserDTO {
  @IsEmail()
  @ApiProperty({ example: 'john.doe@example.com', description: "Must unique"})
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ example: 'StrongPassword123'})
  password: string;

  @IsString()
  @ApiProperty({ example: 'John'})
  firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Doe', required: false })
  lastName: string;

  @IsEnum(UserType)
  @ApiProperty({ example: 'Admin', description: 'Admin or Customer' })
  type: UserType;
}