import path from 'path';
setEnvironmentVariables();

import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from './app/core/config/services/config.service';
import { HttpExceptionFilter } from './app/core/filters/http-exception.filter';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import * as bodyParser from 'body-parser';
import { ConfigModule } from './app/core/config/config.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.select(ConfigModule).get(ConfigService);

  if (config.globalPrefix) {
    app.setGlobalPrefix(config.globalPrefix);
  }

  // Configure body-parser for uploads
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // Security
  app.enableCors();
  app.use(helmet());
  app.use(rateLimit(config.rateLimit));

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));

  configureSwagger(app, config);

  await app.listen(config.port);
}

function setEnvironmentVariables(): void {
  process.env.NODE_CONFIG_DIR = [path.join(process.cwd(), 'config'), path.join(process.cwd(), '../config')].join(
    path.delimiter,
  );
}

// @ts-ignore
function configureSwagger(app: INestApplication, config: ConfigService): void {
  const options = new DocumentBuilder()
    .setTitle(config.swaggerConfig.swaggerTitle)
    .setDescription(config.swaggerConfig.swaggerDescription)
    .setVersion(config.swaggerConfig.swaggerVersion)
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, swaggerDocument);
}

bootstrap();
