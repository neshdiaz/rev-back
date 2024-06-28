import { Usuario } from 'src/usuarios/usuario.entity';
import { Bodega } from 'src/bodegas/bodega.entity';
import { Plataforma } from 'src/plataformas/plataforma.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Traslado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  fecha_traslado: Date;

  @OneToOne(() => Usuario)
  responsable: Usuario;

  @Column({ nullable: true })
  notes: string;

  @ManyToOne(() => Plataforma, (plataforma) => plataforma.traslados)
  plataforma: Plataforma;

  @OneToOne(() => Bodega)
  @JoinColumn()
  bodega_origen: Bodega;

  @OneToOne(() => Bodega)
  @JoinColumn()
  bodega_destino: Bodega;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
