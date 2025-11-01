import { BadRequestException, Injectable } from '@nestjs/common';
import { OrdenEntity } from '../entities/ordenes.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrdenDto, UpdateOrdenDto } from '../dtos/orden.dto';
import { MqttService } from '../../mqtt/mqtt.service';

@Injectable()
export class OrdenesService {
  // Lógica del servicio de órdenes puede ser implementada aquí

  constructor(
    @InjectRepository(OrdenEntity)
    private readonly ordenRepository: Repository<OrdenEntity>,
    private readonly mqttService: MqttService,
  ) {}

  obtenerOrdenes() {
    return this.ordenRepository.find();
  }

  async obtenerOrdenPorId(id: string) {
    const orden = await this.findOne(id);
    return orden;
  }

  async crearOrden(body: CreateOrdenDto) {
    try {
      const nuevaOrden = await this.ordenRepository.save(body);
      const ordenCompleta = await this.ordenRepository.findOneBy({ id: nuevaOrden.id });

      // Enviar notificación MQTT cuando se crea una nueva orden
      if (ordenCompleta) {
        await this.mqttService.publishNewOrder(ordenCompleta);
      }

      return ordenCompleta;
    } catch {
      throw new BadRequestException('Error creating order');
    }
  }

  async actualizarOrden(body: UpdateOrdenDto) {
    const orden = await this.findOne(body.id!);
    if (!orden) {
      throw new BadRequestException('Order not found');
    }
    await this.ordenRepository.update(body.id!, body);

    // Obtener la orden actualizada y enviar notificación MQTT
    const ordenActualizada = await this.findOne(body.id!);
    if (ordenActualizada) {
      await this.mqttService.publishOrderUpdate(ordenActualizada);
    }

    return true;
  }

  async eliminarOrden(id: string) {
    const orden = await this.findOne(id);
    if (!orden) {
      throw new BadRequestException('Order not found');
    }
    await this.ordenRepository.delete(id);

    // Enviar notificación MQTT cuando se elimina una orden
    await this.mqttService.publishOrderDeleted(id);

    return true;
  }

  private async findOne(id: string) {
    return await this.ordenRepository.findOneBy({ id });
  }
}
