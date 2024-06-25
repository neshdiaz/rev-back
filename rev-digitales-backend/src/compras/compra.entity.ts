import { Proveedor } from 'src/proveedores/proveedor.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Compra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  /*
    detalle_compra[] OneToMany
  */

  @Column()
  proveedor_id: number;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.compras)
  @JoinColumn()
  proveedor: Proveedor;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
