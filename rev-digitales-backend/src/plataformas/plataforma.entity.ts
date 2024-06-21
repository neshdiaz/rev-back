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

  @Column({ nullable: true })
  fecha_compra: Date;

  @Column({ nullable: true })
  image: string;

  @Column()
  bodega_id: number;

  @ManyToOne(() => Bodega, (bodega) => bodega.plataformas)
  @JoinColumn()
  bodega_actual: Bodega;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
