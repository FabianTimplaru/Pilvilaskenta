import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const swaggerInfo = {
  api_path: `/docs`,
  title: `Pet service API`,
  description: `Demo for NestJS features and capabilities using simple pets.`,
  version: `0.9`,
  tag: ``
};


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  const config = new DocumentBuilder()
    .setTitle(swaggerInfo.title)
    .setDescription(swaggerInfo.description)
    .setVersion(swaggerInfo.version)
    .addTag(swaggerInfo.tag)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(swaggerInfo.api_path, app, document);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
