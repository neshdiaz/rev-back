import { Injectable } from '@nestjs/common';
import { Compra } from './compra.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AssignProveedorCompraDto } from './dto/assign-proveedor-compra.dto';
import { Proveedor } from 'src/proveedores/proveedor.entity';

@Injectable()
export class ComprasService {
  constructor(
    @InjectRepository(Compra) private compraRepository: Repository<Compra>,
    @InjectRepository(Proveedor)
    private proveedorRepository: Repository<Proveedor>,
  ) {}

  async createCompra(compra: CreateCompraDto) {
    const newCompra = this.compraRepository.create(compra);
    return this.compraRepository.save(newCompra);
  }

  getCompras(): Promise<Compra[]> {
    return this.compraRepository.find();
  }

  async getCompra(id: number) {
    const compraFound = await this.compraRepository.findOne({
      relations: ['proveedor'],
      where: {
        id,
      },
    });

    if (!compraFound) {
      throw new HttpException(
        'Este id de compra no existe',
        HttpStatus.NOT_FOUND,
      );
    }
    return compraFound;
  }

  async deleteCompra(id: number) {
    const result = await this.compraRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpException('El elemento no existe', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async updateCompra(id: number, compra: UpdateCompraDto) {
    const compraFound = await this.compraRepository.findOne({
      where: {
        id,
      },
    });

    if (!compraFound) {
      throw new HttpException(
        'Este id de compra no existe',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.compraRepository.update(id, compra);
  }

  async assingProveedorCompra(id: number, proveedor: AssignProveedorCompraDto) {
    const compraFound = await this.compraRepository.findOne({
      where: {
        id,
      },
    });

    if (!compraFound) {
      throw new HttpException(
        'Este id de compra no existe',
        HttpStatus.NOT_FOUND,
      );
    }

    const proveedorFound = await this.proveedorRepository.findOne({
      where: {
        id: proveedor.proveedor,
      },
    });

    if (!proveedorFound) {
      throw new HttpException(
        'Este id de proveedor no existe',
        HttpStatus.NOT_FOUND,
      );
    }

    compraFound.proveedor = proveedorFound;

    return this.compraRepository.update(id, compraFound);
  }
}
