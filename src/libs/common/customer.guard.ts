import { PrismaService } from '@/modules/common/prisma/prisma.service';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { UserType } from '@prisma/client';
import configuration from '@/libs/config/configuration';

@Injectable()
export class CustomerGuard extends AuthGuard('jwt') {
  constructor(private prisma: PrismaService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const jwt = new JwtService({
      secret: configuration().jwtSecretKey,
    });

    const { sub: id }: any =
    jwt.decode(request.headers.authorization?.substr(7)) ?? {};

    if (id) {
      const isCustomer = await this.prisma.user.count({
        where: {
          id,
          type: UserType.Customer,
        },
      });

      return !!isCustomer;
    }

    return false;
  }
}