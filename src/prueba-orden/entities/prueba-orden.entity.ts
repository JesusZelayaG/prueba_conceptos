import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductoEntity } from './producto.entity';

@Entity('prueba_ordenes')
export class PruebaOrdenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', name: 'numero_orden', nullable: true })
  numeroOrden: number;

  @Column({ type: 'int', name: 'numero_mesa', nullable: true })
  numeroMesa: number;

  @Column({ type: 'int', name: 'numero_comanda', nullable: true })
  numeroComanda: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mesero: string;

  @Column({ type: 'varchar', name: 'hora_registrada', nullable: true })
  horaRegistrada: string;

  @Column({ type: 'int', name: 'tipo_orden', nullable: true })
  tipoOrden: number;

  @OneToMany('ProductoEntity', 'orden', {
    cascade: true,
    eager: true,
  })
  productos: ProductoEntity[];

  @Column({ type: 'varchar', name: 'referencia_orden', nullable: true })
  referenciaOrden: string;

  @Column({ type: 'varchar', nullable: true })
  proveedor: string;

  @Column({ type: 'varchar', name: 'tiempo_transcurrido', nullable: true })
  tiempoTranscurrido: string;
}
