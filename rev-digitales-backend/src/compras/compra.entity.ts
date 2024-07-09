import { Plataforma } from 'src/plataformas/plataforma.entity';
import { Proveedor } from 'src/proveedores/proveedor.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'compras' })
export class Compra {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  fecha: Date;

  @Column()
  notes: string;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.compras)
  @JoinColumn()
  proveedor: Proveedor;

  @ManyToMany(() => Plataforma, (plataforma) => plataforma.compras)
  @JoinTable({ name: 'compra_detalle' })
  plataformas: Plataforma[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
