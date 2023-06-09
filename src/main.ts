import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigType } from './core/config/config'

async function bootstrap() {
  global.devMode = process.env.NODE_ENV === 'development' ? true : false
  
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  const config = app.get(ConfigService)
  await app.listen(config.get<ConfigType['PORT']>('PORT'))
}

bootstrap()
