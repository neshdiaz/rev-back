import { Module } from '@nestjs/common';
import { ComprasController } from './compras.controller';
import { ComprasService } from './compras.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor } from 'src/proveedores/proveedor.entity';
import { Plataforma } from 'src/plataformas/plataforma.entity';
import { Compra } from './compra.entity';
import { Bodega } from 'src/bodegas/bodega.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Compra, Proveedor, Plataforma, Bodega])],
  controllers: [ComprasController],
  providers: [ComprasService],
})
export class ComprasModule {}
