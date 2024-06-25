import { Plataforma } from 'src/plataformas/plataforma.entity';
import { Compra } from 'src/compras/compra.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class detalle_compra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  cantidad: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  costo_total: number;

  /* plataforma  OneToMany
    compra ManyToOne
    compraId number
  */
  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
