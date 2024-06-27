import { Plataforma } from './plataforma.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TipoPlataforma {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Plataforma, (plataforma) => plataforma.tipo_plataforma)
  plataformas: Plataforma[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
