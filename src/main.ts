import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validateEnvVariable } from './utils/env.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = Number(validateEnvVariable(process.env.PORT, 'PORT')) || 8080;

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
}
bootstrap();
