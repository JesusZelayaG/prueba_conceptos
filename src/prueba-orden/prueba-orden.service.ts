import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PruebaOrdenEntity } from './entities/prueba-orden.entity';
import { EnvioOrdenEntity } from './entities/envio-orden.entity';
import { CreatePruebaOrdenDto, CreateEnvioOrdenDto } from './dtos/prueba-orden.dto';
import { MqttService } from '../mqtt/mqtt.service';

@Injectable()
export class PruebaOrdenService {
  private readonly logger = new Logger(PruebaOrdenService.name);

  constructor(
    @InjectRepository(PruebaOrdenEntity)
    private readonly pruebaOrdenRepository: Repository<PruebaOrdenEntity>,
    @InjectRepository(EnvioOrdenEntity)
    private readonly envioOrdenRepository: Repository<EnvioOrdenEntity>,
    private readonly mqttService: MqttService,
  ) {}

  async obtenerPruebaOrdenes() {
    return this.pruebaOrdenRepository.find();
  }

  async obtenerEnvioOrdenes() {
    try {
      return await this.envioOrdenRepository.find();
    } catch (error) {
      // Si la tabla no existe o hay un error, retornar array vacío
      const message = error instanceof Error ? error.message : 'Error desconocido';
      this.logger.error('Error al obtener envíos de órdenes:', message);
      return [];
    }
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

  async crearEnvioOrden(body: CreateEnvioOrdenDto) {
    try {
      const nuevoEnvio = await this.envioOrdenRepository.save(body);
      const envioCompleto = await this.envioOrdenRepository.findOne({
        where: { id: nuevoEnvio.id },
      });

      // Enviar notificación MQTT cuando se crea un nuevo envío de orden
      if (envioCompleto) {
        await this.mqttService.publishEnvioOrden(envioCompleto);
      }

      return envioCompleto;
    } catch {
      throw new BadRequestException('Error al crear envío de orden');
    }
  }

  async eliminarPruebaOrden(id: string) {
    const orden = await this.obtenerPruebaOrdenPorId(id);
    await this.pruebaOrdenRepository.delete(id);
    return { message: 'Prueba orden eliminada', id: orden.id };
  }
}
