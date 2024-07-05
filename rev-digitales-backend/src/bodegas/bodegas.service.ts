import { Usuario } from './../usuarios/usuario.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bodega } from './bodega.entity';
import { CreateBodegaDto } from './dto/create-bodega.dto';
import { UpdateBodegaDto } from './dto/update-bodega.dto';
import { assignResponsableDto } from './dto/assign-responsable.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { IsNumber } from 'class-validator';
@Injectable()
export class BodegasService {
  constructor(
    @InjectRepository(Bodega) private bodegaRepository: Repository<Bodega>,
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  async createBodega(bodega: CreateBodegaDto) {
    const bodegaFound = await this.bodegaRepository.findOne({
      where: {
        nombre: bodega.nombre,
      },
    });

    if (bodegaFound) {
      throw new HttpException(
        'Este nombre de bodega ya existe',
        HttpStatus.CONFLICT,
      );
    }

    const newBodega = this.bodegaRepository.create(bodega);

    return this.bodegaRepository.save(newBodega);
  }

  async getBodegas(): Promise<Bodega[]> {
    return this.bodegaRepository.find({
      relations: ['responsables', 'plataformas'],
    });
  }

  async getBodega(id: number) {
    const bodegaFound = this.bodegaRepository.findOne({
      where: {
        id,
      },
    });

    if (!bodegaFound) {
      throw new HttpException(
        'Este id de bodega no existe',
        HttpStatus.NOT_FOUND,
      );
    }
    return bodegaFound;
  }

  async deleteBodega(id: number) {
    const result = await this.bodegaRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpException('El elemento no existe', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async updateBodega(id: number, Bodega: UpdateBodegaDto) {
    const bodegaFound = await this.bodegaRepository.findOne({
      where: {
        id,
      },
    });

    if (!bodegaFound) {
      throw new HttpException(
        'Este id de bodega no existe',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.bodegaRepository.update(id, Bodega);
  }

  async assignResponsable(idBodega: number, idResponsable: assignResponsableDto) {
    const bodegaFound = await this.bodegaRepository.findOne({
      where: {
        id: idBodega,
      },
      relations: ['responsables', 'plataformas'],
    });

    if (!bodegaFound) {
      throw new HttpException(
        'Este id de bodega no existe',
        HttpStatus.NOT_FOUND,
      );
    }

    if (typeof idResponsable.responsables != 'number'){
      throw new HttpException('el formato del id del responsable no es valido', HttpStatus.BAD_REQUEST);
    }

    const responsableFound = await this.usuarioRepository.findOne({
      where: {
        id: idResponsable.responsables,
      },
    });

    if (!responsableFound) {
      throw new HttpException(
        'Este id de usuario no es valido',
        HttpStatus.NOT_FOUND,
      );
    }

    const listResponsables = bodegaFound.responsables
    listResponsables.push(responsableFound)
    bodegaFound.responsables = listResponsables;

    return this.bodegaRepository.save(bodegaFound)
  }
}

