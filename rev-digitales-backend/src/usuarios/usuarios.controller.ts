import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}
  @Post()
  createUsuario(@Body() newUsuario: CreateUsuarioDto) {
    return this.usuariosService.createUsuario(newUsuario);
  }
}
