import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ordenes')
export class OrdenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  cliente: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'int' })
  cantidadItems: number;
}
