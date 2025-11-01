import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { PruebaOrdenEntity } from './prueba-orden.entity';
import { EnvioOrdenEntity } from './envio-orden.entity';

@Entity('informacion_ordenes')
export class InformacionOrdenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne('PruebaOrdenEntity', 'informacionOrden', {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'orden_id' })
  orden: PruebaOrdenEntity;

  @Column({ type: 'boolean', name: 'es_envio_nuevo', default: true })
  esEnvioNuevo: boolean;

  @Column({ type: 'varchar', name: 'id_de_control', nullable: true })
  idDeControl: string;

  @OneToOne('EnvioOrdenEntity', 'informacionDeOrdenes')
  envioOrden: EnvioOrdenEntity;
}
