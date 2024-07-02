import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bodega } from './bodega.entity';
import { CreateBodegaDto } from './dto/create-bodega.dto';
//import { UpdateBodegaDto } from './dto/update-bodega.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class BodegasService {
  constructor(
    @InjectRepository(Bodega) private bodegaRepository: Repository<Bodega>,
  ) {}

  async createBodega(Bodega: CreateBodegaDto) {
    const bodegaFound = await this.bodegaRepository.find({
      where: {
        nombre: Bodega.nombre,
      },
    });

    if (bodegaFound) {
      return new HttpException(
        'Este nombre ya existe, intente con otro para evitar confusiones',
        HttpStatus.CONFLICT,
      );
    }

    const newBodega = this.bodegaRepository.create(Bodega);
    return this.bodegaRepository.save(newBodega);
  }

  async getBodegas(): Promise<Bodega[]> {
    return this.bodegaRepository.find();
  }
}
