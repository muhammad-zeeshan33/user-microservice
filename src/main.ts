import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('user-micro');
  const config = new DocumentBuilder()
    .setTitle('User Microservice API')
    .setDescription('API documentation for the User Microservice')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3002).then(() => {
    console.log('User-MicroService is running on Port:3002');
  });
}
bootstrap();
