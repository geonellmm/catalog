import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '@/modules/api/auth/auth.service';
import { UsersModule } from '@/modules/api/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '@/modules/common/prisma/prisma.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecretKey'),
      }),
      inject: [ConfigService],
    }),
    PrismaModule
  ],
  exports:[AuthService],
  providers: [AuthService]
})
export class AuthModule {}
