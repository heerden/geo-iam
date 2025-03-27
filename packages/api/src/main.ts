import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Geo IAM Open API Documentation')
    .setDescription('Geo IAM Open API Documentation')
    .setVersion('1.0')
    .addTag('geo-iam')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.enableCors(); // to include header: Access-Control-Allow-Origin: *
  const port = process.env.PORT || 8080;
  await app.listen(port, '0.0.0.0');
}
void bootstrap();
