import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
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
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Post()
  createUsuario(@Body() newUsuario: CreateUsuarioDto) {
    return this.usuariosService.createUsuario(newUsuario);
  }

  @Get()
  getUsuarios() {
    return this.usuariosService.getUsuarios();
  }

  @Get(':id')
  getUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.getUsuario(id);
  }

  @Delete(':id')
  deleteUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.deleteUsuario(id);
  }

  @Patch(':id')
  updateUsuario(
    @Param('id', ParseIntPipe) id: number,
    @Body() usuario: UpdateUsuarioDto,
  ) {
    return this.usuariosService.updateUsuario(id, usuario);
  }
}
