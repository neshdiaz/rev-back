import { IsArray, IsDateString, IsNumber, IsString } from 'class-validator';
import { CreatePlataformaDto } from '../../plataformas/dto/create-plataforma.dto';

export class CreateCompraWithPlataformasDto {
  @IsString()
  notes: string;

  @IsDateString()
  fecha: Date;

  @IsArray()
  plataformas: CreatePlataformaDto[];

  @IsNumber()
  proveedor: number;
}
