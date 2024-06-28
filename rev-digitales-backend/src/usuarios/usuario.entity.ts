import { Bodega } from 'src/bodegas/bodega.entity';
import { Permiso } from './permiso.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';

export enum UserRol {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  VENDEDOR = 'vendedor',
  CLIENTE = 'cliente',
}

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRol,
    default: UserRol.VENDEDOR,
  })
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Bodega, (bodega) => bodega.responsables)
  @JoinTable()
  responsable_bodegas: Bodega[];

  @ManyToMany(() => Permiso, (permiso) => permiso.usuarios)
  @JoinTable()
  permisos: Permiso[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
