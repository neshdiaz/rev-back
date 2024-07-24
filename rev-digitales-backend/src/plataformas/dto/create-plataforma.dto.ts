import { IsEmail, IsNumber, IsString } from 'class-validator';
import { CreateTipoPlataformaDto } from './create-tipo-plataforma.dto';
import { CreateBodegaDto } from 'src/bodegas/dto/create-bodega.dto';

export class CreatePlataformaDto {
  @IsEmail()
  correo: string;

  @IsString()
  contrasena: string;

  @IsNumber()
  costo_unitario_compra: number;

  @IsNumber()
  vigencia: number;

  @IsNumber()
  tipo_plataforma: CreateTipoPlataformaDto;

  @IsNumber()
  bodega_actual: CreateBodegaDto;
}
