import { Body, Injectable } from '@nestjs/common';
import { Compra } from './compra.entity';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AssignProveedorCompraDto } from './dto/assign-proveedor-compra.dto';
import { AssignPlataformaCompraDto } from './dto/assign-plataforma-compra.dto';
import { Proveedor } from 'src/proveedores/proveedor.entity';
import { Plataforma } from 'src/plataformas/plataforma.entity';
import { CreateCompraWithPlataformasDto } from './dto/create-compra-with-plataformas.dto';
import { Bodega } from 'src/bodegas/bodega.entity';

@Injectable()
export class ComprasService {
  constructor(
    @InjectRepository(Compra) private compraRepository: Repository<Compra>,
    @InjectRepository(Plataforma)
    private plataformaRepository: Repository<Plataforma>,
    @InjectRepository(Proveedor)
    private proveedorRepository: Repository<Proveedor>,
    @InjectRepository(Bodega)
    private bodegaRepository: Repository<Bodega>,
  ) {}

  async createCompra(compra: CreateCompraDto) {
    const newCompra = this.compraRepository.create(compra);
    return this.compraRepository.save(newCompra);
  }

  async createCompraWithPlataformas(
    @Body() compra: CreateCompraWithPlataformasDto,
  ) {
    // Validate if Proveedor exists
    const proveedor = await this.proveedorRepository.findOne({
      where: {
        id: compra.proveedor,
      },
    });

    // If Proveedor doesnt exists throw error
    if (!proveedor) {
      throw new HttpException(
        'Este id de proveedor no existe, debe ser creado primero.',
        HttpStatus.NOT_FOUND,
      );
    }

    // getting bodega object
    const belongsBodega = await this.bodegaRepository.findOne({
      where: {
        id: 1,
        nombre: 'Principal',
      },
    });

    //Validating if Bodega id exists or throw error
    if (!belongsBodega) {
      throw new HttpException(
        'La bodega principal no ha sido creada, contacte con el administrador',
        HttpStatus.NOT_FOUND,
      );
    }

    // Create a new compra and assign proveedor and plataformas.
    const newCompra = this.compraRepository.create();
    newCompra.proveedor = proveedor;

    // For each plataforma in the list save in the db and new array
    const arrPlataformas = [];
    for (const plat of compra.plataformas) {
      plat.bodega_actual = belongsBodega;
      await this.plataformaRepository.save(plat);
      arrPlataformas.push(plat);
    }

    // Save the list of plataformas in the compra
    // and save all the object newCompra and return
    newCompra.plataformas = arrPlataformas;
    return this.compraRepository.save(newCompra);
  }

  getCompras(): Promise<Compra[]> {
    return this.compraRepository.find({
      relations: ['proveedor', 'plataformas', 'plataformas.tipo_plataforma'],
    });
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

  async assignProveedorCompra(id: number, proveedor: AssignProveedorCompraDto) {
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

  //Validar posiblemente no se utilice
  async assignPlataformasCompra(
    id: number,
    plataforma: AssignPlataformaCompraDto,
  ) {
    //
    // looking for compra in DB
    //
    const compraFound = await this.compraRepository.findOne({
      where: {
        id: id,
      },
    });

    /**
     * check if the compra id is valid
     */
    if (!compraFound) {
      throw new HttpException(
        'Este id de compra no existe',
        HttpStatus.NOT_FOUND,
      );
    }

    /**
     * check if all ids are valid in the DB
     **/
    const plataformasFound = await this.plataformaRepository.find({
      where: {
        id: In(plataforma.plataformas),
      },
    });

    /**
     * check if everything was found
     **/
    if (plataformasFound.length !== plataforma.plataformas.length) {
      throw new HttpException(
        'No se encontraron todos los ids de plataformas, por favor verifique.',
        HttpStatus.NOT_FOUND,
      );
    }
    console.log('Transformada en array');
    console.log(Object.entries(plataformasFound));
    console.log('Objetos de BD Original');
    console.log(compraFound);
    compraFound[0].plataformas = plataformasFound;

    //return this.compraRepository.update(id, compraFound);
  }
}
