import { Bodega } from 'src/bodegas/bodega.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  payment_state: string;

  @Column({ nullable: true })
  fecha_compra: Date;

  @Column({ nullable: true })
  fecha_vencimiento: Date;

  @Column({ nullable: true })
  fecha_pagada: Date;

  @Column({ nullable: true })
  vigencia: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costo_unitario: number;

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

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
