import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  // transform is nessesary for the string Dates to be transformed into Date type (keep transform)
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap().catch((error) => {
  Logger.error("Error starting server", error);
  process.exit(1);
});
