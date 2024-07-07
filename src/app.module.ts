import { Module } from '@nestjs/common';
import { ApiModules } from '@/modules/api/api.modules';
import { CommonModules } from '@/modules/common/common.modules';
import { ConfigModule } from '@nestjs/config';
import configuration from '@/libs/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ApiModules,
    CommonModules
  ]
})

export class AppModule {}
