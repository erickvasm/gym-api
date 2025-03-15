import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '@/main/app.module';
import { AuthGuard } from '@/main/auth/auth.guard';
import { envConstants } from '@main/config/env-constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('ERP Gym API')
    .setDescription('Documentación de la API del ERP para gimnasios')
    .setVersion('1.0')
    .addTag('ERP')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  app.useGlobalGuards(new AuthGuard());

  await app.listen(envConstants.port ?? 3000);
}

bootstrap().catch((error) => {
  throw new Error(String(error));
});
