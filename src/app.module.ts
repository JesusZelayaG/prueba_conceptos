import { Module } from '@nestjs/common';
import { OrdenesModule } from './ordenes/ordenes.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfig } from './env.models';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configurationService: ConfigService<EnvConfig>) => ({
        type: 'postgres',
        host: configurationService.get('DATABASE_HOST'),
        port: configurationService.get('DATABASE_PORT'),
        username: configurationService.get('DATABASE_USER'),
        password: configurationService.get('DATABASE_PASSWORD'),
        database: configurationService.get('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    OrdenesModule,
  ],
})
export class AppModule {}
