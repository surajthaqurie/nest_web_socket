import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: true });
    app.setGlobalPrefix("api/v1");

    const configService = app.get(ConfigService);
    const PORT = configService.get<string>("PORT") || 3000;
    const APP_URL = configService.get<string>("APP_URL");

    await app.listen(PORT, () => {
        console.log(`Server is starting on ${APP_URL} at ${new Date()} with process id:`, process.pid);
    });

    process.on("SIGTERM", (): void => {
        console.log("Server is closing at ", new Date());
        app.close();
    });

    process.on("SIGINT", (): void => {
        console.log("Server is closing at ", new Date());
        app.close();
    });
}
bootstrap();
