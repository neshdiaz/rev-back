import { Injectable } from '@nestjs/common';
import { usuario } from './usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(usuario) private usuarioRepository: Repository<usuario>,
  ) {}

  createUsuario(usuario: CreateUsuarioDto) {
    const newUsuario = this.usuarioRepository.create(usuario);
    return this.usuarioRepository.save(newUsuario);
  }
}
