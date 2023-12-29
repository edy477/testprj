import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";

import {resolve } from 'path';

async function bootstrap() {
  /*const app = await NestFactory.create(AppModule);
  */
  const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
  );

  app.useStaticAssets(resolve('./src/public'));
  // @ts-ignore
  app.setBaseViewsDir(resolve('./src/views'));
  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();
