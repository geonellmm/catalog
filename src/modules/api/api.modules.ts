import { Module } from '@nestjs/common';
import { UsersModule } from '@/modules/api/users/users.module';
import { AuthModule } from '@/modules/api/auth/auth.module';
import { ProductsModule } from '@/modules/api/products/products.module';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    AuthModule
  ]
})
export class ApiModules {}
