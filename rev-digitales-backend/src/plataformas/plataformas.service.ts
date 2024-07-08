import { Compra } from 'src/compras/compra.entity';
import { Bodega } from 'src/bodegas/bodega.entity';
import { TipoPlataforma } from './tipo_plataforma.entity';
import { Plataforma } from 'src/plataformas/plataforma.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlataformaDto } from './dto/create-plataforma.dto';
import { UpdatePlataformaDto } from './dto/update-plataforma.dto';
import { CreateTipoPlataformaDto } from './dto/create-tipo-plataforma.dto';
import { UpdateTipoPlataformaDto } from './dto/update-tipo-plataforma.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
@Injectable()
export class PlataformasService {
  constructor(
    @InjectRepository(Compra) private compraRepository: Repository<Compra>,
    @InjectRepository(Bodega) private bodegaRepository: Repository<Bodega>,
    @InjectRepository(TipoPlataforma)
    private tipoPlataformaRepository: Repository<TipoPlataforma>,
    @InjectRepository(Plataforma)
    private plataformaRepository: Repository<Plataforma>,
  ) {}

  async CreatePlataforma(Plataforma: CreatePlataformaDto) {
    const newPlataforma = this.plataformaRepository.create(Plataforma);
    return this.plataformaRepository.save(newPlataforma);
  }

  async CreateTipoPlataforma(TipoPlataforma: CreateTipoPlataformaDto) {
    const newTipoPlataforma =
      this.tipoPlataformaRepository.create(TipoPlataforma);
    return this.tipoPlataformaRepository.save(newTipoPlataforma);
  }

  getPlataformas(): Promise<Plataforma[]> {
    return this.plataformaRepository.find();
  }

  getTiposPlataformas(): Promise<TipoPlataforma[]> {
    return this.tipoPlataformaRepository.find();
  }

  async getPlataforma(id: number) {
    const plataformaFound = await this.plataformaRepository.findOne({
      where: {
        id,
      },
    });

    if (!plataformaFound) {
      throw new HttpException(
        'Este id de plataforma no existe',
        HttpStatus.NOT_FOUND,
      );
    }
    return plataformaFound;
  }

  async getTipoPlataforma(id: number) {
    const tipoPlataformaFound = await this.tipoPlataformaRepository.findOne({
      where: {
        id,
      },
    });

    if (!tipoPlataformaFound) {
      throw new HttpException(
        'Este id de tipo de plataforma no existe',
        HttpStatus.NOT_FOUND,
      );
    }
    return tipoPlataformaFound;
  }

  async deletePlataforma(id: number) {
    const result = await this.plataformaRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpException('El elemento no existe', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async deleteTipoPlataforma(id: number) {
    const result = await this.tipoPlataformaRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpException('El elemento no existe', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async updatePlataforma(id: number, Plataforma: UpdatePlataformaDto) {
    const plataformaFound = await this.plataformaRepository.findOne({
      where: {
        id,
      },
    });

    if (!plataformaFound) {
      throw new HttpException(
        'Este id de tipo de plataforma no existe',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.plataformaRepository.update(id, Plataforma);
  }

  async updateTipoPlataforma(
    id: number,
    TipoPlataforma: UpdateTipoPlataformaDto,
  ) {
    const tipoPlataformaFound = await this.tipoPlataformaRepository.findOne({
      where: {
        id,
      },
    });

    if (!tipoPlataformaFound) {
      throw new HttpException(
        'Este id de tipo de plataforma no existe',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.tipoPlataformaRepository.update(id, TipoPlataforma);
  }
}
