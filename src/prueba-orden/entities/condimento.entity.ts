import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductoEntity } from './producto.entity';

@Entity('prueba_condimentos')
export class CondimentoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', name: 'id_condimento', nullable: true })
  idCondimento: number;

  @Column({ type: 'text', nullable: true })
  comentario: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nombre: string;

  @ManyToOne('ProductoEntity', 'condimentos', {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'producto_id' })
  producto: ProductoEntity;
}
