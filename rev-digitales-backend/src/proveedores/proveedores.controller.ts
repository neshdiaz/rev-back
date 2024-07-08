import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
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
import { ProveedoresService } from './proveedores.service';
@Controller('proveedores')
export class ProveedoresController {
  constructor(private proveedoresService: ProveedoresService) {}
  @Post()
  createUsuario(@Body() newUsuario: CreateProveedorDto) {
    return this.proveedoresService.createProveedor(newUsuario);
  }
  @Get()
  getProveedores() {
    return this.proveedoresService.getProveedores();
  }

  @Get(':id')
  getUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.proveedoresService.getProveedor(id);
  }

  @Delete(':id')
  deleteProveedor(@Param('id', ParseIntPipe) id: number) {
    return this.proveedoresService.deleteProveedor(id);
  }

  @Patch(':id')
  updateProveedor(
    @Param('id', ParseIntPipe) id: number,
    @Body() usuario: UpdateProveedorDto,
  ) {
    return this.proveedoresService.updateProveedor(id, usuario);
  }
}
