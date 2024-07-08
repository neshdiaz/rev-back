import { Module } from '@nestjs/common';
import { PlataformasController } from './plataformas.controller';
import { PlataformasService } from './plataformas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bodega } from 'src/bodegas/bodega.entity';
import { Compra } from 'src/compras/compra.entity';
import { Traslado } from 'src/traslados/traslado.entity';
import { TipoPlataforma } from './tipo_plataforma.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bodega, Compra, Traslado, TipoPlataforma]),
  ],

  controllers: [PlataformasController],
  providers: [PlataformasService],
})
export class PlataformasModule {}
