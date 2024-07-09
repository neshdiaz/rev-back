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
@Controller('compras')
export class ComprasController {
  constructor(private comprasService: ComprasService) {}

  @Post()
  createCompra(@Body() newCompra: CreateCompraDto) {
    return this.comprasService.createCompra(newCompra);
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
}
