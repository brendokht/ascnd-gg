import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";
import { CORS_OPTIONS } from "@ascnd-gg/constants";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(CORS_OPTIONS);
  app.setGlobalPrefix("v1");
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 8080);
}
void bootstrap();
