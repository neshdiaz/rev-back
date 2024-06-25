import { Compra } from 'src/compras/compra.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Proveedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  pagina_web: string;

  @Column({ nullable: true })
  whatsapp: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Compra, (compra) => compra.proveedor)
  compras: Compra[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
