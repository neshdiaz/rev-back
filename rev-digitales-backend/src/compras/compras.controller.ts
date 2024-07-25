import { AssignPlataformaCompraDto } from './dto/assign-plataforma-compra.dto';
import { AssignProveedorCompraDto } from './dto/assign-proveedor-compra.dto';

import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ComprasService } from './compras.service';
import { CreateCompraWithPlataformasDto } from './dto/create-compra-with-plataformas.dto';

@Controller('compras')
export class ComprasController {
  constructor(private comprasService: ComprasService) {}

  @Post()
  createCompra(@Body() newCompra: CreateCompraDto) {
    return this.comprasService.createCompra(newCompra);
  }

  @Post('/create-compra-with-plataformas/')
  createCompraWithPlataformas(
    @Body() newCompra: CreateCompraWithPlataformasDto,
  ) {
    return this.comprasService.createCompraWithPlataformas(newCompra);
  }

  @Get()
  getCompras() {
    return this.comprasService.getCompras();
  }

  @Get(':id')
  getCompra(@Param('id', ParseIntPipe) id: number) {
    return this.comprasService.getCompra(id);
  }

  @Delete(':id')
  deleteCompra(@Param('id', ParseIntPipe) id: number) {
    return this.comprasService.deleteCompra(id);
  }

  @Patch(':id')
  updateCompra(
    @Param('id', ParseIntPipe) id: number,
    @Body() compra: UpdateCompraDto,
  ) {
    return this.comprasService.updateCompra(id, compra);
  }

  @Patch('/assign-proveedor-compra/:id')
  AssignProveedorCompra(
    @Param('id', ParseIntPipe) id: number,
    @Body() proveedor: AssignProveedorCompraDto,
  ) {
    return this.comprasService.assignProveedorCompra(id, proveedor);
  }

  @Patch('/assign-plataforma-compra/:id')
  AssignPlataformasCompra(
    @Param('id', ParseIntPipe) id: number,
    @Body() plataforma: AssignPlataformaCompraDto,
  ) {
    return this.comprasService.assignPlataformasCompra(id, plataforma);
  }
}
