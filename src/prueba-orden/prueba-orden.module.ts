import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PruebaOrdenController } from './prueba-orden.controller';
import { PruebaOrdenService } from './prueba-orden.service';
import { PruebaOrdenEntity } from './entities/prueba-orden.entity';
import { ProductoEntity } from './entities/producto.entity';
import { ModificadorEntity } from './entities/modificador.entity';
import { CondimentoEntity } from './entities/condimento.entity';
import { EnvioOrdenEntity } from './entities/envio-orden.entity';
import { InformacionOrdenEntity } from './entities/informacion-orden.entity';
import { MqttService } from '../mqtt/mqtt.service';

@Module({
  imports: [TypeOrmModule.forFeature([PruebaOrdenEntity, ProductoEntity, ModificadorEntity, CondimentoEntity, EnvioOrdenEntity, InformacionOrdenEntity])],
  controllers: [PruebaOrdenController],
  providers: [PruebaOrdenService, MqttService],
})
export class PruebaOrdenModule {}
