import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  createUsuario(Usuario: CreateUsuarioDto) {
    const newUsuario = this.usuarioRepository.create(Usuario);
    return this.usuarioRepository.save(newUsuario);
  }
}
