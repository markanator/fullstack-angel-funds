import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app/app.module';

const PORT = Number(process.env.PORT) || 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({
    origin: process.env.CORS_URL,
    credentials: true,
  });
  app.use(compression());
  await app.listen(PORT, () =>
    console.log(`${process.env.NODE_ENV} running on http:localhost/${PORT}`),
  );
}
bootstrap();
