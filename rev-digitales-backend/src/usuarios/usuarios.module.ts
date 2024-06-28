import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Permiso } from './permiso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Permiso])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
