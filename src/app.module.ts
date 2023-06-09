import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './core/auth/auth.module'
import { JwtAuthGuard } from './core/auth/guards/jwtAuth.guard'
import { RolesGuard } from './core/auth/guards/roles.guard'
import { UserModule } from './core/user/user.module'
import { ResponseInterceptor } from './core/response.interceptor'
import { ScheduleModule } from '@nestjs/schedule'
import { config, ConfigType } from './core/config/config'
import * as path from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(path.dirname(__dirname), '.env'),
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const DB = configService.get<ConfigType['DB']>('DB')
        return {
          type: 'postgres',
          host: DB.host,
          port: DB.port,
          database: DB.name,
          username: DB.user,
          password: DB.password,
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
        }
      },
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
  ],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ResponseInterceptor,
    },
    {
      provide: 'APP_PIPE',
      useClass: ValidationPipe,
    },
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
})
export class AppModule { }
