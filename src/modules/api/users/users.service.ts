import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { PrismaService } from '@/modules/common/prisma/prisma.service';
import { LogInResponseDTO } from '@/modules/api/users/dto/signin-user.dto';
import { CreateUserDTO } from '@/modules/api/users/dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<LogInResponseDTO> {
    const { email, password, firstName, lastName, type } = createUserDTO;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await this.prisma.user.create({
        data: { email, password: hashedPassword, firstName, lastName, type },
        select: { id: true, email: true, firstName: true, lastName: true, type: true },
      });

      // Assert the type to match User
      const user: User = createdUser as User;

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

    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException({ message: 'Email already exists' });
      } else {
        throw error;
      }
    }
  }
  
  async findOne(email: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({
      where: {email: email}
    });
  }
}
