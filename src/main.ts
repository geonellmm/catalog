import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from '@/libs/config/configuration';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Wristcheck API Documentation')
    .setDescription('The Wristcheck API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configuration().port, '0.0.0.0');
}
bootstrap();
