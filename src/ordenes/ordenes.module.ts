import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenesController } from './controllers/ordenes.controller';
import { OrdenesService } from './services/ordenes.service';
import { OrdenEntity } from './entities/ordenes.entity';
import { MqttService } from '../mqtt/mqtt.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrdenEntity])],
  controllers: [OrdenesController],
  providers: [OrdenesService, MqttService],
})
export class OrdenesModule {}
