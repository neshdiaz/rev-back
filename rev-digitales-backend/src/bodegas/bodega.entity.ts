import { Plataforma } from 'src/plataformas/plataforma.entity';
import { Usuario } from 'src/usuarios/usuario.entity';
//import { Usuario } from 'src/usuarios/usuario.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Bodega {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToMany(() => Usuario, (usuario) => usuario.responsable_bodegas)
  responsables: Usuario[];

  @Column({ default: false })
  isPrincipal: boolean;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Plataforma, (plataforma) => plataforma.bodega_actual)
  plataformas: Plataforma[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
