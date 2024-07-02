import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  async createUsuario(Usuario: CreateUsuarioDto) {
    const userFound = await this.usuarioRepository.findOne({
      where: {
        username: Usuario.username,
      },
    });

    if (userFound) {
      return new HttpException(
        'Este nombre de usuario ya existe',
        HttpStatus.CONFLICT,
      );
    }

    const newUsuario = this.usuarioRepository.create(Usuario);
    return this.usuarioRepository.save(newUsuario);
  }

  getUsuarios(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async getUsuario(id: number) {
    const userFound = await this.usuarioRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      return new HttpException(
        'Este id de usuario no existe',
        HttpStatus.NOT_FOUND,
      );
    }
    return userFound;
  }

  async deleteUsuario(id: number) {
    const result = await this.usuarioRepository.delete(id);

    if (result.affected === 0) {
      return new HttpException('El elemento no existe', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async updateUsuario(id: number, Usuario: UpdateUsuarioDto) {
    const userFound = await this.usuarioRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      return new HttpException(
        'Este id de usuario no existe',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.usuarioRepository.update(id, Usuario);
  }
}
