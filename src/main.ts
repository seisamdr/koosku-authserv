import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { CustomValidationPipe } from './common/pipes/custom-validation.pipe';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.use(cookieParser());
  app.enableCors({
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'authorization',
      'x-api-key',
      'X-api-key',
      'x-amz-date',
      'X-amz-securty-token',
    ],
  });

  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('/api/v1', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on port: ${process.env.PORT}`);
}
bootstrap();
