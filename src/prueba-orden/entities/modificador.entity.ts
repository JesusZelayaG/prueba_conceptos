import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductoEntity } from './producto.entity';

@Entity('prueba_modificadores')
export class ModificadorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', name: 'id_modificador', nullable: true })
  idModificador: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nombre: string;

  @ManyToOne('ProductoEntity', 'modificadores', {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'producto_id' })
  producto: ProductoEntity;
}
