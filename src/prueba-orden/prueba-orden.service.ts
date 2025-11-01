import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PruebaOrdenEntity } from './entities/prueba-orden.entity';
import { CreatePruebaOrdenDto } from './dtos/prueba-orden.dto';
import { MqttService } from '../mqtt/mqtt.service';

@Injectable()
export class PruebaOrdenService {
  constructor(
    @InjectRepository(PruebaOrdenEntity)
    private readonly pruebaOrdenRepository: Repository<PruebaOrdenEntity>,
    private readonly mqttService: MqttService,
  ) {}

  async obtenerPruebaOrdenes() {
    return this.pruebaOrdenRepository.find();
  }

  async obtenerPruebaOrdenPorId(id: string) {
    const orden = await this.pruebaOrdenRepository.findOne({
      where: { id },
    });
    if (!orden) {
      throw new BadRequestException('Prueba orden no encontrada');
    }
    return orden;
  }

  async crearPruebaOrden(body: CreatePruebaOrdenDto) {
    try {
      const nuevaOrden = await this.pruebaOrdenRepository.save(body);
      const ordenCompleta = await this.pruebaOrdenRepository.findOne({
        where: { id: nuevaOrden.id },
      });

      // Enviar notificación MQTT cuando se crea una nueva prueba orden
      if (ordenCompleta) {
        await this.mqttService.publishPruebaOrden(ordenCompleta);
      }

      return ordenCompleta;
    } catch {
      throw new BadRequestException('Error al crear prueba orden');
    }
  }

  async eliminarPruebaOrden(id: string) {
    const orden = await this.obtenerPruebaOrdenPorId(id);
    await this.pruebaOrdenRepository.delete(id);
    return { message: 'Prueba orden eliminada', id: orden.id };
  }
}
