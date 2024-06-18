import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  createUsuario(Usuario: CreateUsuarioDto): Promise<Usuario> {
    const newUsuario = this.usuarioRepository.create(Usuario);
    return this.usuarioRepository.save(newUsuario);
  }

  getUsuarios(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  getUsuario(id: number) {
    return this.usuarioRepository.findOne({
      where: {
        id,
      },
    });
  }

  deleteUsuario(id: number) {
    return this.usuarioRepository.delete(id);
  }

  updateUsuario(id: number, Usuario: UpdateUsuarioDto) {
    return this.usuarioRepository.update(id, Usuario);
  }
}
