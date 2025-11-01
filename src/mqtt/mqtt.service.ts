import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mqtt from 'mqtt';
import { OrdenEntity } from '../ordenes/entities/ordenes.entity';

@Injectable()
export class MqttService {
  private readonly logger = new Logger(MqttService.name);
  private client: mqtt.MqttClient;

  constructor(private configService: ConfigService) {
    this.connectToMqtt();
  }

  private connectToMqtt() {
    const mqttUrl = this.configService.get<string>('MQTT_URL', 'mqtt://localhost:1883');
    const username = this.configService.get<string>('MQTT_USERNAME');
    const password = this.configService.get<string>('MQTT_PASSWORD');

    const options: mqtt.IClientOptions = {
      username,
      password,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
    };

    this.client = mqtt.connect(mqttUrl, options);

    this.client.on('connect', () => {
      this.logger.log('Conectado al broker MQTT');
    });

    this.client.on('error', (error) => {
      this.logger.error('Error de conexión MQTT:', error);
    });

    this.client.on('close', () => {
      this.logger.warn('Conexión MQTT cerrada');
    });
  }

  async publishNewOrder(orden: OrdenEntity) {
    const topic = 'ordenes/nueva';
    const message = JSON.stringify({
      action: 'orden_creada',
      id: orden.id,
    });

    return new Promise<void>((resolve, reject) => {
      this.client.publish(topic, message, { qos: 1 }, (error) => {
        if (error) {
          this.logger.error('Error al publicar mensaje MQTT:', error);
          reject(error);
        } else {
          this.logger.log(`Orden nueva publicada en MQTT: ${orden.id}`);
          resolve();
        }
      });
    });
  }

  async publishOrderUpdate(orden: OrdenEntity) {
    const topic = 'ordenes/actualizada';
    const message = JSON.stringify({
      action: 'orden_actualizada',
      id: orden.id,
    });

    return new Promise<void>((resolve, reject) => {
      this.client.publish(topic, message, { qos: 1 }, (error) => {
        if (error) {
          this.logger.error('Error al publicar actualización MQTT:', error);
          reject(error);
        } else {
          this.logger.log(`Orden actualizada publicada en MQTT: ${orden.id}`);
          resolve();
        }
      });
    });
  }

  async publishOrderDeleted(orderId: string) {
    const topic = 'ordenes/eliminada';
    const message = JSON.stringify({
      action: 'orden_eliminada',
      id: orderId,
    });

    return new Promise<void>((resolve, reject) => {
      this.client.publish(topic, message, { qos: 1 }, (error) => {
        if (error) {
          this.logger.error('Error al publicar eliminación MQTT:', error);
          reject(error);
        } else {
          this.logger.log(`Orden eliminada publicada en MQTT: ${orderId}`);
          resolve();
        }
      });
    });
  }

  onModuleDestroy() {
    if (this.client) {
      this.client.end();
    }
  }
}
