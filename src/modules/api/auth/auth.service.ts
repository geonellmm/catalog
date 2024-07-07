import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@/modules/common/prisma/prisma.service';
import { UsersService } from '@/modules/api/users/users.service';
import { LogInDTO, LogInResponseDTO } from '@/modules/api/users/dto/signin-user.dto';
import { User } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async signIn(signInUserDTO: LogInDTO): Promise<LogInResponseDTO> {
    const { email, password } = signInUserDTO;

    const user: User = await this.usersService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password,user.password)

    if (passwordMatch) {
      const accessToken = await this.jwtService.signAsync({ sub: user.id, email: user.email });

      return {
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          type: user.type
        }
      }
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
