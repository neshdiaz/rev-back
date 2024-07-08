import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Proveedor } from './proveedor.entity';
@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedor)
    private proveedorRepository: Repository<Proveedor>,
  ) {}

  async createProveedor(Proveedor: CreateProveedorDto) {
    const proveedorFound = await this.proveedorRepository.findOne({
      where: {
        email: Proveedor.email,
      },
    });

    if (proveedorFound) {
      throw new HttpException(
        'Ya se ha registrado un proveedor con este email',
        HttpStatus.FOUND,
      );
    }
    const newProveedor = this.proveedorRepository.create(Proveedor);
    return this.proveedorRepository.save(newProveedor);
  }

  getProveedores(): Promise<Proveedor[]> {
    return this.proveedorRepository.find();
  }

  async getProveedor(id: number) {
    const proveedorFound = await this.proveedorRepository.findOne({
      where: {
        id,
      },
    });

    if (!proveedorFound) {
      throw new HttpException(
        'Este id de proveedor no existe',
        HttpStatus.NOT_FOUND,
      );
    }
    return proveedorFound;
  }

  async deleteProveedor(id: number) {
    const result = await this.proveedorRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpException('El elemento no existe', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async updateProveedor(id: number, Proveedor: UpdateProveedorDto) {
    const proveedorFound = await this.proveedorRepository.findOne({
      where: {
        id,
      },
    });

    if (!proveedorFound) {
      throw new HttpException(
        'Este id de proveedor no existe',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.proveedorRepository.update(id, Proveedor);
  }
}
