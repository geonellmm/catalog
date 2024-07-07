import { Module } from '@nestjs/common';
import { PrismaModule } from '@/modules/common/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule
  ]
})
export class CommonModules {}