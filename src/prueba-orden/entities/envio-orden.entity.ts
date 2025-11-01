import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { InformacionOrdenEntity } from './informacion-orden.entity';

@Entity('envio_ordenes')
export class EnvioOrdenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne('InformacionOrdenEntity', 'envioOrden', {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'informacion_orden_id' })
  informacionDeOrdenes: InformacionOrdenEntity;

  @Column({ type: 'varchar', name: 'promedio_ordenes', nullable: true })
  promedioOrdenes: string;
}
