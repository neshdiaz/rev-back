import { Module } from '@nestjs/common';
import { BodegasController } from './bodegas.controller';
import { BodegasService } from './bodegas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plataforma } from 'src/plataformas/plataforma.entity';
import { Usuario } from 'src/usuarios/usuario.entity';
import { Permiso } from 'src/usuarios/permiso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plataforma, Usuario, Permiso])],
  controllers: [BodegasController],
  providers: [BodegasService],
})
export class BodegasModule {}
