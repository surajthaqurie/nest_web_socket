import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  const PORT = 3000;

  await app.listen(PORT, () => {
    console.log(
      `Server is starting on ${PORT} at ${new Date()} with process id:`,
      process.pid,
    );
  });

  process.on('SIGTERM', (): void => {
    console.log('Server is closing at ', new Date());
    app.close();
  });

  process.on('SIGINT', (): void => {
    console.log('Server is closing at ', new Date());
    app.close();
  });
}
bootstrap();
