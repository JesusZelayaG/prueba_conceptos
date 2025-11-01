import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PruebaOrdenEntity } from './prueba-orden.entity';
import { ModificadorEntity } from './modificador.entity';
import { CondimentoEntity } from './condimento.entity';

@Entity('prueba_productos')
export class ProductoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', name: 'id_detalle_orden', nullable: true })
  idDetalleOrden: number;

  @Column({ type: 'int', name: 'id_producto', nullable: true })
  idProducto: number;

  @Column({ type: 'int', nullable: true })
  cantidad: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  comentario: string;

  @Column({ type: 'int', nullable: true })
  comanda: number;

  @Column({ type: 'varchar', name: 'fecha_ultimo_registro', nullable: true })
  fechaUltimoRegistro: string;

  @Column({ type: 'boolean', default: false })
  estado: boolean;

  @ManyToOne('PruebaOrdenEntity', 'productos', {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orden_id' })
  orden: PruebaOrdenEntity;

  @OneToMany('ModificadorEntity', 'producto', {
    cascade: true,
    eager: true,
  })
  modificadores: ModificadorEntity[];

  @OneToMany('CondimentoEntity', 'producto', {
    cascade: true,
    eager: true,
  })
  condimentos: CondimentoEntity[];
}
