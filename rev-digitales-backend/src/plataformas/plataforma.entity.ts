import { Bodega } from 'src/bodegas/bodega.entity';
import { Compra } from 'src/compras/compra.entity';
import { TipoPlataforma } from './tipo_plataforma.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Traslado } from 'src/traslados/traslado.entity';

export enum plataformaState {
  ADQUIRIDA = 'adquirida',
  VENCIDA = 'vencida',
  VENDIDA = 'vendida',
}

export enum paymentState {
  PAGADA = 'pagada',
  PENDIENTE_PAGO = 'pendiente_pago',
}

export enum grupo {
  LATAM = 'latam',
  REDLATAM = 'red_latam',
  REVENTAS = 'reventas',
}
@Entity()
export class Plataforma {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => TipoPlataforma,
    (tipo_plataforma) => tipo_plataforma.plataformas,
  )
  tipo_plataforma: TipoPlataforma;

  @Column()
  correo: string;

  @Column()
  contraseña: string;

  @Column({
    type: 'enum',
    enum: plataformaState,
    default: plataformaState.ADQUIRIDA,
  })
  plataforma_state: string;

  @Column({
    type: 'enum',
    enum: paymentState,
    default: paymentState.PENDIENTE_PAGO,
  })
  payment_proveedor_state: string;

  @Column({ nullable: true })
  fecha_pagada_proveedor: Date;

  @Column({
    type: 'enum',
    enum: paymentState,
    default: paymentState.PENDIENTE_PAGO,
  })
  payment_vendedor_state: string;

  @Column({ nullable: true })
  fecha_pagada_vendedor: Date;

  @Column({ nullable: true })
  fecha_compra: Date;

  @Column({ nullable: true })
  fecha_vencimiento: Date;

  @Column({ nullable: true })
  vigencia: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costo_unitario_compra: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  costo_unitario_venta: number;

  @Column({ nullable: true })
  image: string;

  @Column()
  bodega_id: number;

  @ManyToOne(() => Bodega, (bodega) => bodega.plataformas)
  @JoinColumn()
  bodega_actual: Bodega;

  @Column({
    nullable: true,
    type: 'enum',
    enum: grupo,
  })
  grupo: string;

  @Column({ nullable: true })
  notes: string;

  @ManyToMany(() => Compra, (compra) => compra.plataformas)
  compras: Compra[];

  @OneToMany(() => Traslado, (traslado) => traslado.plataforma)
  traslados: Traslado[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
