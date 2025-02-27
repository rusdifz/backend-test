import { NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { writeFileSync } from 'fs';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import {
  ResponseErrorInterceptor,
  ResponseSuccessInterceptor,
} from './middlewares';

import { CommonHeaderGuard } from './middlewares';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validateCustomDecorators: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new ResponseSuccessInterceptor());
  app.useGlobalFilters(new ResponseErrorInterceptor());

  app.useGlobalGuards(new CommonHeaderGuard());

  // build docs, do not forget to change description
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Documentation for API Usage')
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Development')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  // generate docs on file
  writeFileSync(
    './project.swagger-spec.json',
    JSON.stringify(document, null, 2),
  );

  await app.listen(3000);
}
bootstrap();
